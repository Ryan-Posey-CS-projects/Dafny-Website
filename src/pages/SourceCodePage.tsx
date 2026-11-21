import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

export type SourceColorMode = "dark" | "light";

export type SourceCodePageProps = {
    title: string;
    language: string;
    sourceCode: string;
    colorMode: SourceColorMode;
    onColorModeChange: (colorMode: SourceColorMode) => void;
};

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

export default function SourceCodePage({
    title,
    language,
    sourceCode,
    colorMode,
    onColorModeChange,
}: SourceCodePageProps) {
    const highlightedSource = Prism.highlight(sourceCode, dafnyGrammar, "dafny");

    return (
        <article className="card source-code-page">
            <div className="card-body">
                <header className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                    <h1 className="card-title mb-0">{title}</h1>
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge text-bg-secondary">{language}</span>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            aria-pressed={colorMode === "light"}
                            onClick={() =>
                                onColorModeChange(colorMode === "dark" ? "light" : "dark")
                            }
                        >
                            {colorMode === "dark" ? "Light mode" : "Dark mode"}
                        </button>
                    </div>
                </header>
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
        </article>
    );
}
