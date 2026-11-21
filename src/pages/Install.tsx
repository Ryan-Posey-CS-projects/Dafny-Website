import { useState } from "react";
import helloSourceUrl from "../examples/Hello.dfy";
import DafnyCodeViewer, { type SourceColorMode } from "./DafnyCodeViewer";

function Install() {
    const [codeColorMode, setCodeColorMode] = useState<SourceColorMode>("dark");

    return (
        <article className="card text-start">
            <div className="card-body p-3 p-md-5">
                <header className="mb-5 text-center">
                    <p className="text-primary fw-semibold text-uppercase mb-2">
                        Get started
                    </p>
                    <h1 className="display-5 fw-bold">Install Dafny</h1>
                    <p className="lead mx-auto mb-0" style={{ maxWidth: '42rem' }}>
                        Set up Dafny in Visual Studio Code for the easiest start and
                        install the command-line tools for your operating system to run
                        Dafny from the terminal.
                    </p>
                </header>

                <section className="mb-5" aria-labelledby="install-vscode">
                    <div className="rounded border p-4 p-md-5">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-8">
                                <p className="small text-primary fw-semibold text-uppercase mb-2">
                                    Recommended
                                </p>
                                <h2 className="h3" id="install-vscode">
                                    Use Dafny in Visual Studio Code
                                </h2>
                                <ol className="mb-0">
                                    <li className="mb-2">
                                        Install{' '}
                                        <a
                                            href="https://code.visualstudio.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visual Studio Code
                                        </a>
                                        .
                                    </li>
                                    <li className="mb-2">
                                        On Windows, macOS, or Linux, install the{' '}
                                        <a
                                            href="https://dotnet.microsoft.com/download/dotnet/8.0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            .NET 8 SDK
                                        </a>
                                        .
                                    </li>
                                    <li className="mb-2">
                                        Open the Extensions view and install{' '}
                                        <a
                                            href="https://marketplace.visualstudio.com/items?itemName=dafny-lang.ide-vscode"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Dafny
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        Open a <code>.dfy</code> file. The extension will
                                        offer to install Dafny if it is not already
                                        available.
                                    </li>
                                </ol>
                            </div>
                            <div className="col-lg-4">
                                <aside className="rounded bg-body-tertiary p-4">
                                    <h3 className="h5">Why use the extension?</h3>
                                    <p className="mb-0">
                                        It checks your Dafny code in the editor and reports
                                        verification results as you work.
                                    </p>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-5" aria-labelledby="install-cli">
                    <div className="mb-3">
                        <h2 className="h3 mb-1" id="install-cli">
                            Install the command-line tools
                        </h2>
                        <p className="text-body-secondary mb-0">
                            Download the latest release for your platform and follow its
                            setup steps.
                        </p>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Windows</h3>
                                <ol className="ps-3 mb-0">
                                    <li className="mb-2">
                                        Install the{' '}
                                        <a
                                            href="https://dotnet.microsoft.com/download/dotnet/8.0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            .NET 8 SDK
                                        </a>
                                        .
                                    </li>
                                    <li className="mb-2">
                                        Download the Windows archive from the{' '}
                                        <a
                                            href="https://github.com/dafny-lang/dafny/releases/latest"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            latest Dafny release
                                        </a>
                                        .
                                    </li>
                                    <li className="mb-2">
                                        Before extracting, right-click the archive, open
                                        Properties, select <strong>Unblock</strong> if
                                        shown, and click OK.
                                    </li>
                                    <li>
                                        Extract the archive and run <code>Dafny.exe</code>.
                                    </li>
                                </ol>
                            </article>
                        </div>
                        <div className="col-md-4">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">macOS</h3>
                                <ol className="ps-3 mb-0">
                                    <li className="mb-2">
                                        Install the{' '}
                                        <a
                                            href="https://dotnet.microsoft.com/download/dotnet/8.0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            .NET 8 SDK
                                        </a>
                                        .
                                    </li>
                                    <li className="mb-2">
                                        Download and extract the macOS archive from the{' '}
                                        <a
                                            href="https://github.com/dafny-lang/dafny/releases/latest"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            latest Dafny release
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        In the extracted Dafny folder, run{' '}
                                        <code>./allow_on_mac.sh</code>, then start Dafny
                                        with <code>./dafny</code>.
                                    </li>
                                </ol>
                            </article>
                        </div>
                        <div className="col-md-4">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Linux</h3>
                                <ol className="ps-3 mb-0">
                                    <li className="mb-2">
                                        Install the{' '}
                                        <a
                                            href="https://dotnet.microsoft.com/download/dotnet/8.0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            .NET 8 SDK
                                        </a>
                                        .
                                    </li>
                                    <li className="mb-2">
                                        Download and extract the Linux archive from the{' '}
                                        <a
                                            href="https://github.com/dafny-lang/dafny/releases/latest"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            latest Dafny release
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        Run <code>dafny/dafny</code> from the extracted
                                        folder.
                                    </li>
                                </ol>
                            </article>
                        </div>
                    </div>
                    <p className="small text-body-secondary mt-3 mb-0">
                        Follow the release notes if your platform needs additional setup.
                        For other installation options and system requirements, see the{' '}
                        <a
                            href="https://dafny.org/dafny/Installation"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            official Dafny installation guide
                        </a>
                        .
                    </p>
                </section>

                <section aria-labelledby="install-verify">
                    <div className="rounded bg-body-tertiary">
                        <h2 className="h3" id="install-verify">
                            Verify your installation
                        </h2>
                        <p>
                            Save this as <code>Hello.dfy</code>. If Dafny is on your{' '}
                            <code>PATH</code>, run <code>dafny verify Hello.dfy</code> in
                            a terminal opened in the same folder:
                        </p>
                        <DafnyCodeViewer
                            filename="Hello.dfy"
                            language="Dafny"
                            sourceUrl={helloSourceUrl}
                            colorMode={codeColorMode}
                            onColorModeChange={setCodeColorMode}
                        />
                        <p>
                            Dafny should report that verification succeeded. If you have
                            not added it to your PATH, run the executable by its full path
                        </p>
                        <ul>
                            <li>
                                Windows:{' '}
                                <code>&amp; "C:\path\to\Dafny.exe" verify Hello.dfy</code>
                            </li>
                            <li>
                                macOS/Linux:{' '}
                                <code>"/path/to/dafny" verify Hello.dfy</code>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="mb-5" aria-labelledby="install-build-run">
                    <h2 className="h3" id="install-build-run">
                        Build and run simple programs
                    </h2>
                    <div className="rounded border p-4">
                        <p>
                            With <code>Hello.dfy</code> saved from the previous step,
                            the quickest way to see it work is <code>dafny run</code>,
                            which verifies, compiles, and executes the program in a single
                            step:
                        </p>
                        <pre className="rounded bg-body-tertiary p-3 mb-3">
                            <code>{'dafny run Hello.dfy'}</code>
                        </pre>
                        <p>
                            To produce a reusable executable without running it, use{' '}
                            <code>dafny build</code>. C# is the default target, and{' '}
                            <code>-t</code> picks another one (see the translation
                            targets below):
                        </p>
                        <pre className="rounded bg-body-tertiary p-3 mb-3">
                            <code>{'dafny build -t:cs Hello.dfy\ndafny build -t:js Hello.dfy'}</code>
                        </pre>
                        <p className="mb-0">
                            The build output is a program you can run directly (
                            <code>Hello.exe</code> on Windows, <code>./Hello</code> on
                            Linux and macOS). In Visual Studio Code, the extension runs
                            the verifier in the background as you type, and{' '}
                            <code>dafny format</code> tidies indentation across your
                            files.
                        </p>
                    </div>
                </section>

                <section className="mb-5" aria-labelledby="install-path">
                    <div className="mb-3">
                        <h2 className="h3 mb-1" id="install-path">
                            Add Dafny to your PATH
                        </h2>
                        <p className="text-body-secondary mb-0">
                            The standalone release archives do not add Dafny to your PATH
                            automatically. You can run it from its installation folder,
                            or add the folder containing the Dafny executable to your PATH to
                            use the <code>dafny</code> command from any terminal.
                        </p>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Windows</h3>
                                <ol className="ps-3 mb-0">
                                    <li className="mb-2">
                                        Search Windows for{' '}
                                        <strong>Edit environment variables for your account</strong>.
                                    </li>
                                    <li className="mb-2">
                                        Select <strong>Path</strong>, choose{' '}
                                        <strong>Edit</strong>, then <strong>New</strong>.
                                    </li>
                                    <li>
                                        Add the folder containing <code>Dafny.exe</code>,
                                        save the changes, and open a new terminal.
                                    </li>
                                </ol>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">macOS and Linux</h3>
                                <p>
                                    Add the folder containing the <code>dafny</code>{' '}
                                    executable to the PATH for the current terminal:
                                </p>
                                <pre className="rounded bg-body-tertiary p-3 mb-2">
                                    <code>{'export PATH="$PATH:/path/to/dafny"'}</code>
                                </pre>
                                <p className="mb-0">
                                    Replace <code>/path/to/dafny</code> with the folder
                                    where you extracted Dafny. To keep this setting, add
                                    the command to <code>~/.zshrc</code> or{' '}
                                    <code>~/.bashrc</code>, then open a new terminal.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="install-translation">
                    <div className="mb-3">
                        <h2 className="h3 mb-1" id="install-translation">
                            Translation targets
                        </h2>
                        <p className="text-body-secondary mb-0">
                            Verification needs only Dafny and the Z3 solver it bundles.
                            Compiling to a target language additionally requires that
                            language's toolchain. Use <code>dafny build</code> with one
                            of the targets below to translate and compile, or{' '}
                            <code>dafny run</code> with the same target option to verify,
                            compile, and execute in one step. C++ has only rudimentary,
                            special-purpose support.
                        </p>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">C# (default target)</h3>
                                <p className="mb-0 text-body-secondary">
                                    Needs the <code>.NET 8 SDK</code>.{' '}
                                    <code>dafny build -t:cs Hello.dfy</code> produces C#
                                    10 source and compiles it to <code>Hello.exe</code>.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Java</h3>
                                <p className="mb-0 text-body-secondary">
                                    Needs a JDK (Java 8 or newer) with <code>javac</code>,{' '}
                                    <code>jar</code> and <code>java</code>, plus gradle.{' '}
                                    <code>dafny build -t:java Hello.dfy</code> produces{' '}
                                    <code>Hello.jar</code>, run with{' '}
                                    <code>java -jar Hello.jar</code>.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">JavaScript</h3>
                                <p className="mb-0 text-body-secondary">
                                    Needs Node.js 16 or newer and the{' '}
                                    <code>bignumber.js</code> package (
                                    <code>npm install bignumber.js</code>).{' '}
                                    <code>dafny build -t:js Hello.dfy</code> then{' '}
                                    <code>node Hello.js</code>.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Python</h3>
                                <p className="mb-0 text-body-secondary">
                                    Needs Python 3.7 or newer.{' '}
                                    <code>dafny build -t:py Hello.dfy</code> generates a{' '}
                                    <code>Hello-py</code> folder containing the entry
                                    script.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Go</h3>
                                <p className="mb-0 text-body-secondary">
                                    Needs Go 1.18 or newer and the <code>goimports</code>{' '}
                                    tool. <code>dafny build --target:go Hello.dfy</code>{' '}
                                    generates Go source.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Rust</h3>
                                <p className="mb-0 text-body-secondary">
                                    Needs the Rust toolchain from rustup. Support is still
                                    growing, so expect rough edges.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    )
}

export default Install
