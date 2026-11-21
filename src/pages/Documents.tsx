function Documents() {
    return (
        <article className="card text-start">
            <div className="card-body p-3 p-md-5">
                <header className="mb-5 text-center">
                    <h1 className="display-5 fw-bold">Documents and research</h1>
                    <p className="lead mx-auto mb-0" style={{ maxWidth: '42rem' }}>
                        A place for Dafny documentation, learning resources, and academic
                        references.
                    </p>
                </header>

                <section className="mb-5" aria-labelledby="documents-guides">
                    <h2 className="h3 mb-3" id="documents-guides">
                        Documentation and guides
                    </h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Official documentation</h3>
                                <ul className="mb-0 ps-3 text-body-secondary">
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/DafnyRef/DafnyRef"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Reference Manual and User Guide
                                        </a>{' '}
                                        — the complete language reference.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/toc"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Documentation index
                                        </a>{' '}
                                        — every manual and guide in one place.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/HowToFAQ/Errors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Error and warning catalog
                                        </a>{' '}
                                        — what each message means and how to fix it.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/HowToFAQ/index"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            FAQs
                                        </a>{' '}
                                        — short answers to common questions.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/StyleGuide/Style-Guide"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Style Guide
                                        </a>{' '}
                                        — conventions for consistent code.
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/dafny-lang/dafny"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>{' '}
                                        — source code, releases, and issues.
                                    </li>
                                </ul>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">Tutorials and learning resources</h3>
                                <ul className="mb-0 ps-3 text-body-secondary">
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/OnlineTutorial/guide"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Getting started tutorial
                                        </a>{' '}
                                        — a hands-on introduction.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/QuickReference"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Quick Reference
                                        </a>{' '}
                                        — common language features at a glance.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/latest/DafnyCheatsheet.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Cheatsheet
                                        </a>{' '}
                                        — a one-page syntax summary (PDF).
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://mitpress.mit.edu/9780262546232/program-proofs/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Program Proofs
                                        </a>{' '}
                                        — MIT Press, 2023, by Dafny's creator.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://www.youtube.com/@DafnyVideos"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            YouTube channel
                                        </a>{' '}
                                        — talks and recorded lectures.
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            href="https://dafny.org/blog"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Blog
                                        </a>{' '}
                                        — news and deep dives from the maintainers.
                                    </li>
                                    <li>
                                        <a
                                            href="https://dafny.zulipchat.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Zulip chat
                                        </a>{' '}
                                        — where to ask the community questions.
                                    </li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="documents-papers">
                    <h2 className="h3 mb-3" id="documents-papers">
                        Academic papers
                    </h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">
                                    <a
                                        href="https://doi.org/10.1007/978-3-642-17511-4_20"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <em>
                                            Dafny: An Automatic Program Verifier for
                                            Functional Correctness
                                        </em>
                                    </a>
                                </h3>
                                <p className="small text-body-secondary mb-1">
                                    K. Rustan M. Leino · LPAR 2010
                                </p>
                                <p className="mb-0 text-body-secondary">
                                    The 2010 paper that introduced Dafny.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">
                                    <a
                                        href="https://doi.org/10.1007/978-3-642-35746-6_6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <em>Using Dafny, an Automatic Program Verifier</em>
                                    </a>
                                </h3>
                                <p className="small text-body-secondary mb-1">
                                    Herbert, Leino and Quaresma · 2012
                                </p>
                                <p className="mb-0 text-body-secondary">
                                    A practical tour of the language and its verifier.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">
                                    <a
                                        href="https://doi.org/10.4204/EPTCS.237.1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <em>
                                            A Tutorial on Using Dafny to Construct
                                            Verified Software
                                        </em>
                                    </a>
                                </h3>
                                <p className="small text-body-secondary mb-1">
                                    Paqui Lucio · PROLE 2016
                                </p>
                                <p className="mb-0 text-body-secondary">
                                    A gentle introduction for newcomers to automated
                                    verification.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">
                                    <a
                                        href="https://arxiv.org/abs/2208.02920"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <em>
                                            Deductive Verification of Smart Contracts with
                                            Dafny
                                        </em>
                                    </a>
                                </h3>
                                <p className="small text-body-secondary mb-1">
                                    Cassez, Fuller and Anton Quiles · 2022
                                </p>
                                <p className="mb-0 text-body-secondary">
                                    Verifying contract logic, including re-entrancy.
                                </p>
                            </article>
                        </div>
                        <div className="col-md-6">
                            <article className="h-100 rounded border p-4">
                                <h3 className="h5">
                                    <a
                                        href="https://doi.org/10.1145/3779031.3779092"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <em>
                                            Verified VCG and Verified Compiler for Dafny
                                        </em>
                                    </a>
                                </h3>
                                <p className="small text-body-secondary mb-1">
                                    Nezamabadi, Myreen and Tan · CPP 2026
                                </p>
                                <p className="mb-0 text-body-secondary">
                                    Recent work on proving Dafny's own toolchain correct.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    )
}

export default Documents
