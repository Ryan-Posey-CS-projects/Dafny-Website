import { useEffect, useId, useState } from "react";
import SourceCodePage, { type SourceColorMode } from "./SourceCodePage";

const colorModeStorageKey = "dafny-source-viewer-color-mode";
const prefersDarkColorScheme = "(prefers-color-scheme: dark)";

export type SourceTab = {
  label: string;
  sourceCode: string;
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
            project.files.find((file) => file.label === selectedFileLabel) ??
            project.files[0];
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
              {selectedFile ? (
                <>
                  <div className="mb-3">
                    <label className="form-label" htmlFor={fileSelectId}>
                      File
                    </label>
                    <select
                      className="form-select"
                      id={fileSelectId}
                      value={selectedFile.label}
                      onChange={(event) =>
                        setSelectedFileByProject((selectedFiles) => ({
                          ...selectedFiles,
                          [project.id]: event.target.value,
                        }))
                      }
                    >
                      {project.files.map((file) => (
                        <option key={file.label} value={file.label}>
                          {file.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <SourceCodePage
                    title={selectedFile.label}
                    language="Dafny"
                    sourceCode={selectedFile.sourceCode}
                    colorMode={colorMode}
                    onColorModeChange={handleColorModeChange}
                  />
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
