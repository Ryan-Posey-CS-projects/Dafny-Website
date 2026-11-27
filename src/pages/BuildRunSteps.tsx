import { Link } from "react-router-dom";

type BuildRunStepsProps = {
    filename: string;
    hasMain?: boolean;
    headingLevel?: 2 | 3;
    className?: string;
    /** Extra sentence shown after the commands, such as an include note. */
    note?: string;
};

export default function BuildRunSteps({
    filename,
    hasMain = true,
    headingLevel = 2,
    className = "",
    note,
}: BuildRunStepsProps) {
    const Heading = `h${headingLevel}` as "h2" | "h3";

    const commands = hasMain
        ? [
            `dafny verify ${filename}`,
            `dafny run ${filename}`,
            `dafny build -t:js ${filename}`,
        ]
        : [`dafny verify ${filename}`];

    return (
        <section
            className={`rounded border p-4 text-start ${className}`.trim()}
            aria-label={`Build and run ${filename}`}
        >
            <Heading className={headingLevel === 2 ? "h3 mb-3" : "h5 mb-3"}>
                Build and run {filename}
            </Heading>
            <p className="mb-3">
                These commands work the same way for every Dafny file. Use the
                download button above to get the project files, open a terminal
                in that folder, and run:
            </p>
            <pre className="rounded bg-body-tertiary p-3 mb-3">
                <code>{commands.join("\n")}</code>
            </pre>
            <ul className="text-body-secondary mb-3">
                <li>
                    <code>dafny verify</code> checks every proof in the file. It
                    prints nothing when all of the proofs go through.
                </li>
                {hasMain ? (
                    <>
                        <li>
                            <code>dafny run</code> verifies, compiles, and executes
                            the program in one step.
                        </li>
                        <li>
                            <code>dafny build</code> compiles without running it.{" "}
                            <code>-t</code> picks the backend — <code>cs</code> is
                            the default, and <code>java</code>, <code>js</code>,{" "}
                            <code>py</code>, and <code>go</code> also work.
                        </li>
                    </>
                ) : (
                    <li>
                        This file has no <code>Main</code> method, so it is verified
                        rather than run. This is normal for a library or a
                        specification-only file.
                    </li>
                )}
            </ul>
            <p className="small text-body-secondary mb-0">
                {note ? <>{note} </> : null}
                Dafny installed yet? Follow the{" "}
                <Link to="/install">installation guide</Link> first.
            </p>
        </section>
    );
}
