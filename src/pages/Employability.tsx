function Employability() {
    return (
        <article className="card text-start">
            <div className="card-body p-3 p-md-5">
                <header className="mb-5 text-center">
                    <h1 className="display-5 fw-bold">Employability</h1>
                    <p className="lead mx-auto mb-0" style={{ maxWidth: '42rem' }}>
                        Explore how Dafny and formal verification relate to software
                        careers.
                    </p>
                </header>

                <div className="row g-3">
                    <div className="col-md-4">
                        <section className="h-100 rounded border p-4" aria-labelledby="career-roles">
                            <h2 className="h5" id="career-roles">Career paths</h2>
                            <ul className="mb-0 ps-3 text-body-secondary">
                                <li className="mb-2">
                                    <strong className="text-body">
                                        Verification or formal methods engineer
                                    </strong>{' '}
                                    — write specifications and proofs for critical
                                    components, from algorithms to concurrency.
                                </li>
                                <li className="mb-2">
                                    <strong className="text-body">
                                        Software engineer in a safety-critical industry
                                    </strong>{' '}
                                    — aerospace, automotive, medical devices and rail,
                                    where a defect has a regulatory cost.
                                </li>
                                <li className="mb-2">
                                    <strong className="text-body">
                                        Security or smart-contract auditor
                                    </strong>{' '}
                                    — back claims about cryptographic code and financial
                                    contracts with machine-checked proofs.
                                </li>
                                <li>
                                    <strong className="text-body">
                                        Researcher or educator
                                    </strong>{' '}
                                    — advance formal methods and teach verification at
                                    universities.
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="col-md-4">
                        <section className="h-100 rounded border p-4" aria-labelledby="career-sectors">
                            <h2 className="h5" id="career-sectors">Industries</h2>
                            <ul className="mb-0 ps-3 text-body-secondary">
                                <li className="mb-2">
                                    <strong className="text-body">
                                        Cloud and cryptography
                                    </strong>{' '}
                                    — Amazon teams use Dafny in production, including the{' '}
                                    <a
                                        href="https://github.com/aws/aws-encryption-sdk-dafny"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        AWS Encryption SDK for Dafny
                                    </a>
                                    .
                                </li>
                                <li className="mb-2">
                                    <strong className="text-body">
                                        Blockchain and smart contracts
                                    </strong>{' '}
                                    —{' '}
                                    <a
                                        href="https://arxiv.org/abs/2510.24798"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Aurora's launchpad contracts
                                    </a>
                                    ,{' '}
                                    <a
                                        href="https://dafny.org/blog/2025/06/24/evm-bytecode/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        EVM bytecode
                                    </a>
                                    , and the{' '}
                                    <a
                                        href="https://arxiv.org/abs/2105.06009"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ethereum 2.0 deposit contract
                                    </a>{' '}
                                    have all been verified in Dafny.
                                </li>
                                <li className="mb-2">
                                    <strong className="text-body">Education</strong> —
                                    universities use Dafny to teach programming and
                                    security, as in{' '}
                                    <a
                                        href="https://dafny.org/blog/2025/07/03/teaching-pl/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        this classroom case study
                                    </a>
                                    .
                                </li>
                                <li>
                                    <strong className="text-body">
                                        Safety-critical engineering
                                    </strong>{' '}
                                    — formal verification is an accepted part of standards
                                    such as DO-178C in aerospace and ISO 26262 in
                                    automotive.
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="col-md-4">
                        <section className="h-100 rounded border p-4" aria-labelledby="career-skills">
                            <h2 className="h5" id="career-skills">Transferable skills</h2>
                            <ul className="mb-0 ps-3 text-body-secondary">
                                <li className="mb-2">
                                    <strong className="text-body">
                                        Writing precise specifications
                                    </strong>{' '}
                                    — pre- and post-conditions, loop invariants, and
                                    termination measures.
                                </li>
                                <li className="mb-2">
                                    <strong className="text-body">Modular reasoning</strong>{' '}
                                    — verify each component once, then rely on its
                                    contract everywhere else.
                                </li>
                                <li className="mb-2">
                                    <strong className="text-body">Debugging with automation</strong>{' '}
                                    — read solver feedback and counterexamples to find the
                                    real fault quickly.
                                </li>
                                <li>
                                    <strong className="text-body">Edge-case discipline</strong>{' '}
                                    — null dereferences, out-of-bounds access, and
                                    division by zero are checked by the verifier rather
                                    than by review.
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Employability
