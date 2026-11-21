import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export type SourceColorMode = "dark" | "light";

type DafnyCodeViewerProps = {
    filename: string;
    language: string;
    colorMode: SourceColorMode;
    onColorModeChange: (colorMode: SourceColorMode) => void;
} & (
    | { sourceCode: string; sourceUrl?: never }
    | { sourceUrl: string; sourceCode?: never }
);

type SourceLoadState =
    | { sourceUrl: string; status: "loading" }
    | { sourceUrl: string; status: "loaded"; sourceCode: string }
    | { sourceUrl: string; status: "error"; message: string };

const dafnyGrammar: Prism.Grammar = {
    comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
        greedy: true,
    },
    string: {
        pattern: /"(?:\\.|[^"\\])*"/,
        greedy: true,
    },
    annotation: /\{:[^}]*\}/,
    keyword:
        /\b(?:abstract|as|assert|assume|break|by|calc|case|class|codatatype|const|constructor|continue|datatype|decreases|else|ensures|exists|export|extends|for|forall|fresh|function|ghost|if|import|include|in|invariant|label|lemma|map|match|method|modify|module|multiset|new|null|object|old|opened|predicate|print|reads|real|refines|requires|return|returns|seq|set|static|then|this|trait|type|var|while|with|yield)\b/,
    boolean: /\b(?:false|true)\b/,
    number: /\b\d+(?:\.\d+)?\b/,
    function: /\b[a-zA-Z_]\w*(?=\s*\()/,
    "class-name": /\b[A-Z][A-Za-z0-9_]*\b/,
    operator: /<==>|==>|<=|>=|!=|==|&&|\|\||:=|->|<-|::|\+|-|\*|\/|%|<|>|=|!/,
    punctuation: /[{}\[\];(),.:]/,
};

export default function DafnyCodeViewer({
    filename,
    language,
    sourceCode,
    sourceUrl,
    colorMode,
    onColorModeChange,
}: DafnyCodeViewerProps) {
    const [loadState, setLoadState] = useState<SourceLoadState>();

    useEffect(() => {
        if (sourceUrl === undefined) {
            return;
        }

        const controller = new AbortController();
        setLoadState({ sourceUrl, status: "loading" });

        const loadSource = async () => {
            try {
                const response = await fetch(sourceUrl, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                setLoadState({
                    sourceUrl,
                    status: "loaded",
                    sourceCode: await response.text(),
                });
            } catch (loadError) {
                if (!controller.signal.aborted) {
                    setLoadState({
                        sourceUrl,
                        status: "error",
                        message:
                            loadError instanceof Error
                                ? loadError.message
                                : String(loadError),
                    });
                }
            }
        };

        void loadSource();
        return () => controller.abort();
    }, [sourceUrl]);

    const matchingLoadState =
        sourceUrl !== undefined && loadState?.sourceUrl === sourceUrl
            ? loadState
            : undefined;
    const loadedSourceCode =
        sourceCode ??
        (matchingLoadState?.status === "loaded"
            ? matchingLoadState.sourceCode
            : undefined);

    if (loadedSourceCode === undefined) {
        if (matchingLoadState?.status === "error") {
            return (
                <p className="text-danger" role="alert">
                    Could not load {filename}: {matchingLoadState.message}
                </p>
            );
        }

        return (
            <p className="text-body-secondary" role="status">
                Loading {filename}…
            </p>
        );
    }

    const highlightedSource = Prism.highlight(loadedSourceCode, dafnyGrammar, "dafny");
    const downloadSource = () => {
        const downloadUrl = URL.createObjectURL(
            new Blob([loadedSourceCode], { type: "text/plain;charset=utf-8" }),
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = filename;
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    };

    return (
        <div className="source-code-block" data-color-mode={colorMode}>
            <div className="source-code-actions">
                <button
                    type="button"
                    className="btn btn-sm source-code-action"
                    onClick={() =>
                        onColorModeChange(colorMode === "dark" ? "light" : "dark")
                    }
                    aria-label={`Switch code theme to ${colorMode === "dark" ? "light" : "dark"}`}
                    title={`Switch code theme to ${colorMode === "dark" ? "light" : "dark"}`}
                >
                    {colorMode === "dark" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M8 3a.5.5 0 0 1 .5.5V5a.5.5 0 0 1-1 0V3.5A.5.5 0 0 1 8 3m0 8a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0v-1.5A.5.5 0 0 1 8 11m5-3a.5.5 0 0 1-.5.5H11a.5.5 0 0 1 0-1h1.5A.5.5 0 0 1 13 8M5 8a.5.5 0 0 1-.5.5H3a.5.5 0 0 1 0-1h1.5A.5.5 0 0 1 5 8m6.95-3.536a.5.5 0 0 1 0 .707l-1.06 1.06a.5.5 0 1 1-.708-.707l1.061-1.06a.5.5 0 0 1 .707 0m-5.657 5.657a.5.5 0 0 1 0 .707l-1.06 1.06a.5.5 0 1 1-.708-.707l1.061-1.06a.5.5 0 0 1 .707 0m5.657 1.767a.5.5 0 0 1-.707 0l-1.06-1.06a.5.5 0 1 1 .707-.708l1.06 1.061a.5.5 0 0 1 0 .707m-5.657-5.657a.5.5 0 0 1-.707 0l-1.06-1.06a.5.5 0 1 1 .707-.708l1.06 1.061a.5.5 0 0 1 0 .707" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M6 .278a.5.5 0 0 1 .6.742A6 6 0 0 0 11.5 10.5a6 6 0 0 0 3.24-.946.5.5 0 0 1 .742.6A7 7 0 1 1 6 .278" />
                        </svg>
                    )}
                </button>
                <button
                    type="button"
                    className="btn btn-sm source-code-action"
                    onClick={downloadSource}
                    aria-label={`Download ${filename}`}
                    title={`Download ${filename}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                    >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v3.1h14V10.4a.5.5 0 0 1 1 0V14a.5.5 0 0 1-.5.5H.5A.5.5 0 0 1 0 14v-3.6a.5.5 0 0 1 .5-.5" />
                        <path d="M7.5.5a.5.5 0 0 1 1 0v8.79l2.15-2.14a.5.5 0 0 1 .7.7l-3 3a.5.5 0 0 1-.7 0l-3-3a.5.5 0 1 1 .7-.7L7.5 9.29z" />
                    </svg>
                </button>
            </div>
            <pre
                className="source-code-viewer language-dafny"
                data-color-mode={colorMode}
                aria-label={`${language} source code`}
            >
                <code
                    className="language-dafny"
                    dangerouslySetInnerHTML={{ __html: highlightedSource }}
                />
            </pre>
        </div>
    );
}
