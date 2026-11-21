import { useEffect, useId, useState } from "react";
import { strToU8, zipSync } from "fflate";
import SourceCodePage, { type SourceColorMode } from "./SourceCodePage";

const colorModeStorageKey = "dafny-source-viewer-color-mode";
const prefersDarkColorScheme = "(prefers-color-scheme: dark)";

export type SourceTab = {
  label: string;
  sourceUrl: string;
};

export type SourceProject = {
  id: string;
  label: string;
  files: SourceTab[];
};

export type SourceProps = {
  projects: SourceProject[];
};

export default function Source({ projects }: SourceProps) {
  const tabPrefix = useId().replace(/:/g, "");
  const [downloadState, setDownloadState] = useState<
    | { projectId: string; status: "downloading" }
    | { projectId: string; status: "error"; message: string }
    | null
  >(null);
  const [systemColorMode, setSystemColorMode] = useState<SourceColorMode>(
    () =>
      typeof window !== "undefined" &&
        window.matchMedia(prefersDarkColorScheme).matches
        ? "dark"
        : "light",
  );
  const [colorModeOverride, setColorModeOverride] =
    useState<SourceColorMode | null>(() => {
      if (typeof window === "undefined") {
        return null;
      }

      const savedColorMode = window.localStorage.getItem(colorModeStorageKey);
      return savedColorMode === "dark" || savedColorMode === "light"
        ? savedColorMode
        : null;
    });
  const [selectedFileByProject, setSelectedFileByProject] = useState<
    Record<string, string>
  >({});
  const colorMode = colorModeOverride ?? systemColorMode;

  useEffect(() => {
    const colorScheme = window.matchMedia(prefersDarkColorScheme);
    const updateSystemColorMode = () =>
      setSystemColorMode(colorScheme.matches ? "dark" : "light");

    colorScheme.addEventListener("change", updateSystemColorMode);
    return () =>
      colorScheme.removeEventListener("change", updateSystemColorMode);
  }, []);

  const handleColorModeChange = (nextColorMode: SourceColorMode) => {
    window.localStorage.setItem(colorModeStorageKey, nextColorMode);
    setColorModeOverride(nextColorMode);
  };

  const downloadProjectFiles = async (project: SourceProject) => {
    setDownloadState({ projectId: project.id, status: "downloading" });

    try {
      const fileEntries = await Promise.all(
        project.files.map(async ({ label, sourceUrl }) => {
          const response = await fetch(sourceUrl);
          if (!response.ok) {
            throw new Error(
              `Failed to load ${label}: ${response.status} ${response.statusText}`,
            );
          }

          return [label, strToU8(await response.text())] as const;
        }),
      );
      const archive = zipSync(Object.fromEntries(fileEntries));
      const archiveUrl = URL.createObjectURL(
        new Blob([archive], { type: "application/zip" }),
      );
      const downloadLink = document.createElement("a");
      downloadLink.href = archiveUrl;
      downloadLink.download = `${project.id}.zip`;
      downloadLink.click();
      window.setTimeout(() => URL.revokeObjectURL(archiveUrl), 1000);
      setDownloadState(null);
    } catch (downloadError) {
      setDownloadState({
        projectId: project.id,
        status: "error",
        message:
          downloadError instanceof Error
            ? downloadError.message
            : String(downloadError),
      });
    }
  };

  if (projects.length === 0) {
    return <p>No source code was provided.</p>;
  }

  return (
    <div>
      <h1 className="mb-3">Source Code</h1>
      <ul className="nav nav-tabs" role="tablist" aria-label="Projects">
        {projects.map((project, index) => {
          const tabId = `${tabPrefix}-project-tab-${index}`;
          const panelId = `${tabPrefix}-project-panel-${index}`;

          return (
            <li className="nav-item" role="presentation" key={project.id}>
              <button
                className={`nav-link${index === 0 ? " active" : ""}`}
                id={tabId}
                data-bs-toggle="tab"
                data-bs-target={`#${panelId}`}
                type="button"
                role="tab"
                aria-controls={panelId}
                aria-selected={index === 0}
              >
                {project.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tab-content pt-3">
        {projects.map((project, index) => {
          const tabId = `${tabPrefix}-project-tab-${index}`;
          const panelId = `${tabPrefix}-project-panel-${index}`;
          const selectedFileLabel = selectedFileByProject[project.id];
          const selectedFile =
            project.files.find((file) => file.label === selectedFileLabel);
          const fileSelectId = `${panelId}-file-select`;

          return (
            <section
              className={`tab-pane fade${index === 0 ? " show active" : ""}`}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              tabIndex={0}
              key={project.id}
            >
              {project.files.length > 0 ? (
                <>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                      <label className="visually-hidden" htmlFor={fileSelectId}>
                        Select a source file
                      </label>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={downloadState?.status === "downloading"}
                        onClick={() => void downloadProjectFiles(project)}
                      >
                        {downloadState?.projectId === project.id &&
                        downloadState.status === "downloading"
                          ? "Preparing ZIP…"
                          : "Download project files"}
                      </button>
                    </div>
                    <select
                      className="form-select"
                      id={fileSelectId}
                      value={selectedFile?.label ?? ""}
                      onChange={(event) =>
                        setSelectedFileByProject((selectedFiles) => ({
                          ...selectedFiles,
                          [project.id]: event.target.value,
                        }))
                      }
                    >
                      <option value="" disabled hidden>
                        Select a file to view its source code...
                      </option>
                      {project.files.map((file) => (
                        <option key={file.label} value={file.label}>
                          {file.label}
                        </option>
                      ))}
                    </select>
                    {downloadState?.projectId === project.id &&
                      downloadState.status === "error" && (
                        <p className="text-danger mt-2 mb-0" role="alert">
                          Could not download this project's files: {downloadState.message}
                        </p>
                      )}
                  </div>
                  {selectedFile ? (
                    <SourceCodePage
                      title={selectedFile.label}
                      language="Dafny"
                      sourceUrl={selectedFile.sourceUrl}
                      colorMode={colorMode}
                      onColorModeChange={handleColorModeChange}
                    />
                  ) : (
                    <p className="text-body-secondary"></p>
                  )}
                </>
              ) : (
                <p>No source files are available for this project.</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
