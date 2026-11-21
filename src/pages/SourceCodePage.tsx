import DafnyCodeViewer, { type SourceColorMode } from "./DafnyCodeViewer";

export type { SourceColorMode } from "./DafnyCodeViewer";

export type SourceCodePageProps = {
    title: string;
    language: string;
    sourceUrl: string;
    colorMode: SourceColorMode;
    onColorModeChange: (colorMode: SourceColorMode) => void;
};

export default function SourceCodePage({
    title,
    language,
    sourceUrl,
    colorMode,
    onColorModeChange,
}: SourceCodePageProps) {
    return (
        <article className="card source-code-page">
            <div className="card-body">
                <header className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                    <h1 className="card-title mb-0">{title}</h1>
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge text-bg-secondary">{language}</span>
                    </div>
                </header>
                <DafnyCodeViewer
                    filename={title}
                    language={language}
                    sourceUrl={sourceUrl}
                    colorMode={colorMode}
                    onColorModeChange={onColorModeChange}
                />
            </div>
        </article>
    );
}
