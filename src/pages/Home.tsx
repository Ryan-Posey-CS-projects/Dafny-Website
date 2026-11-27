import { useState } from 'react'
import { Link } from 'react-router-dom'
import introSourceUrl from '../examples/beginner/Intro.dfy'
import DafnyCodeViewer, { type SourceColorMode } from './DafnyCodeViewer'
import dafnyLogo from '../imgs/dafny-logo.jpg'

function Home() {
    const [codeColorMode, setCodeColorMode] = useState<SourceColorMode>('dark')

    return (
        <div className="card">
            <div className="card-body">
                <section className="home-hero py-4 py-md-5">
                    <div className="row align-items-center justify-content-center g-4">
                        <div className="col-md-8">
                            <h1 className="display-4 fw-bold">
                                Write code. Prove it meets its specifications.
                            </h1>
                            <p className="lead hero-text mb-0">
                                Dafny is a programming language with an automated verifier that
                                checks code against specifications. It can catch errors such as
                                out-of-bounds access before runtime, helping prevent coding-related
                                crashes.
                            </p>
                            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mt-4">
                                <Link className="btn btn-primary" to="/maze">
                                    Try the Maze Solver
                                </Link>
                                <Link className="btn btn-outline-primary" to="/code">
                                    Explore Dafny Source
                                </Link>
                                <Link className="btn btn-outline-primary" to="/install">
                                    Install Dafny
                                </Link>
                            </div>
                        </div>
                        <div className="col-8 col-sm-6 col-md-4">
                            <img
                                className="home-hero_logo img-fluid"
                                src={dafnyLogo}
                                alt="Dafny logo"
                            />
                        </div>
                    </div>
                </section>

                <div className="row g-3 text-start mt-2 align-items-stretch">
                    <div className="col-lg-7">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">
                                    Specifications live next to your code
                                </h2>
                                <p className="card-text">
                                    A <code>method</code> states what it promises with{' '}
                                    <code>requires</code> and <code>ensures</code> clauses.
                                    Dafny proves that the body delivers on those promises for
                                    every possible input — no test suite required.{' '}
                                    <Link to="/documents">Learn the language</Link> with the
                                    official tutorial.
                                </p>
                                <DafnyCodeViewer
                                    filename="Intro.dfy"
                                    language="Dafny"
                                    sourceUrl={introSourceUrl}
                                    colorMode={codeColorMode}
                                    onColorModeChange={setCodeColorMode}
                                />
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-5">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">What the verifier checks</h2>
                                <ul className="ps-3 text-body-secondary">
                                    <li className="mb-2">
                                        Array and sequence indices stay within bounds.
                                    </li>
                                    <li className="mb-2">
                                        No null references are dereferenced.
                                    </li>
                                    <li className="mb-2">
                                        Division never sees a zero divisor.
                                    </li>
                                    <li className="mb-2">
                                        Preconditions hold at every call site, so bad inputs
                                        are rejected at compile time.
                                    </li>
                                    <li className="mb-2">
                                        Loop invariants and termination measures are proven
                                        on every loop.
                                    </li>
                                    <li>
                                        Your own <code>assert</code> statements are proven
                                        along the way.
                                    </li>
                                </ul>
                                <p className="small mb-0 mt-3">
                                    See the{' '}
                                    <Link to="/documents">error and warning catalog</Link>{' '}
                                    for what each verifier message means.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="row g-3 text-start mt-2">
                    <div className="col-md-6">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">Describe what your code should do</h2>
                                <p className="card-text mb-0">
                                    Dafny lets you express expectations about your program, such
                                    as preconditions, postconditions, and loop invariants.{' '}
                                    <Link to="/about">How Dafny checks them</Link> is covered
                                    on the About page.
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="col-md-6">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">Compile to real languages</h2>
                                <p className="card-text mb-0">
                                    Once a program verifies, Dafny translates it to C#, Java,
                                    JavaScript, Python, Go, or Rust — so verified code runs in
                                    real projects. See the{' '}
                                    <Link to="/install#install-translation">
                                        translation targets
                                    </Link>{' '}
                                    for what each toolchain needs.
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="col-md-6">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">Explore verification in action</h2>
                                <p className="card-text mb-0">
                                    Try the <Link to="/maze">maze example</Link>, then{' '}
                                    <Link to="/code?project=maze-solver&file=Maze.dfy">browse its Dafny source</Link> to see how
                                    a program and its specifications fit together.
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="col-md-6">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">Learn at your own pace</h2>
                                <p className="card-text mb-0">
                                    Follow the{' '}
                                    <Link to="/documents">
                                        getting-started tutorial and quick reference
                                    </Link>
                                    , or read the research papers behind the language — all
                                    collected on the Documents page.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                <section className="mt-3 rounded border border-primary border-2 p-4 text-start" aria-labelledby="home-compare">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                        <div>
                            <h2 className="h5 mb-1" id="home-compare">
                                How Dafny compares
                            </h2>
                            <p className="text-body-secondary mb-0">
                                See Dafny side by side with Agda, a dependently typed
                                proof language, and with Java, C#, and Python — comparing
                                how each checks correctness, how much proof work they
                                demand, and how the resulting programs run.
                            </p>
                        </div>
                        <Link
                            className="btn btn-primary text-nowrap flex-shrink-0"
                            to="/about#about-comparison"
                        >
                            Open the comparison table
                        </Link>
                    </div>
                </section>

                <section className="mt-4" aria-labelledby="home-explore">
                    <h2 className="h4" id="home-explore">
                        Explore the site
                    </h2>
                    <div className="row g-3 text-start">
                        <div className="col-sm-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="h6 card-title">
                                        <Link to="/install">Install</Link>
                                    </h3>
                                    <p className="small text-body-secondary mb-0">
                                        Download Dafny and verify your first program.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="h6 card-title">
                                        <Link to="/about">About</Link>
                                    </h3>
                                    <p className="small text-body-secondary mb-0">
                                        What Dafny is, its history, and how it compares.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="h6 card-title">
                                        <Link to="/documents">Documents</Link>
                                    </h3>
                                    <p className="small text-body-secondary mb-0">
                                        Manuals, tutorials, and academic papers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="h6 card-title">
                                        <Link to="/employability">Employability</Link>
                                    </h3>
                                    <p className="small text-body-secondary mb-0">
                                        Where Dafny skills show up in industry.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home
