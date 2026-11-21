const comparisonDimensions = [
    { key: 'typicalUse', label: 'Typical use' },
    { key: 'verification', label: 'Verification and safety' },
    { key: 'distinction', label: 'Key distinction' },
] as const

const Dafny = {
    name: 'Dafny',
    typicalUse: 'Programs whose correctness properties need machine-checked proofs',
    verification: 'Checks preconditions at call sites and proves postconditions, invariants, and assertions',
    distinction: 'Specifications are part of the language and checked before code generation'
};

const Java = {
    name: 'Java',
    typicalUse: 'Backend services, enterprise software, and Android applications',
    verification: 'Type checking, tests, and static analysis; formal proofs usually use additional tools',
    distinction: 'A mature JVM ecosystem with broad library and deployment support'
};

const CS = {
    name: 'C#',
    typicalUse: '.NET services, desktop applications, and games',
    verification: 'Type checking, tests, and static analysis; formal proofs usually use additional tools',
    distinction: 'A broad .NET ecosystem; also a Dafny compilation target'
};

const Python = {
    name: 'Python',
    typicalUse: 'Scripting, automation, data science, and web applications',
    verification: 'Tests and optional type or static analysis tools; formal proofs require additional tools',
    distinction: 'Concise syntax and a large package ecosystem, with dynamic typing'
};

const comparisonLanguages = [Dafny, Java, CS, Python];

const milestones = [
    {
        title: 'Origins',
        period: '2010',
        description: (
            <>
                Created by K. Rustan M. Leino at Microsoft Research and built on the
                Boogie verification language and the Z3 solver, Dafny was introduced
                in the 2010 paper "Dafny: An Automatic Program Verifier for
                Functional Correctness".
            </>
        ),
    },
    {
        title: 'Growth',
        period: '2016 – 2023',
        description: (
            <>
                Open-sourced under the dafny-lang organization in 2016. Dafny 3.0
                (2021) brought full compilation to C#, JavaScript, Go and Java; Dafny
                4.0 (2023) added a revamped command line, a formatter, and the Python
                target.
            </>
        ),
    },
    {
        title: 'Today',
        period: '2025',
        description: (
            <>
                Dafny 4.11.0 (August 2025) is the latest release, with standard
                libraries and a growing Rust target. It is taught at universities and
                used in industry, with active communities on GitHub, Zulip, YouTube,
                and the blog.
            </>
        ),
    },
];

function About() {
    return (
        <article className="card text-start">
            <div className="card-body p-3 p-md-5">
                <header className="mb-5 text-center">
                    <p className="text-primary fw-semibold text-uppercase mb-2">
                        About the language
                    </p>
                    <h1 className="display-5 fw-bold">Meet Dafny</h1>
                    <p className="lead mx-auto mb-0" style={{ maxWidth: '42rem' }}>
                        A programming language designed to help developers write programs
                        and specify what those programs should do.
                    </p>
                </header>

                <section className="mb-5" aria-labelledby="about-description">
                    <div className="row g-4 align-items-stretch">
                        <div className="col-lg-8">
                            <div className="h-100 rounded border p-4">
                                <h2 className="h3" id="about-description">
                                    What is Dafny?
                                </h2>
                                <p className="mb-3">
                                    Dafny brings programming and formal verification together.
                                    Developers write specifications alongside their code,
                                    and Dafny checks whether the implementation satisfies
                                    those specifications. The verifier turns each proof
                                    obligation into logic and discharges it automatically
                                    with the Z3 solver, so mistakes such as out-of-bounds
                                    access or a missing loop invariant surface while you
                                    write the code rather than in production.
                                </p>
                                <p className="mb-0">
                                    Dafny is used in industry — Amazon's teams rely on it
                                    for the{' '}
                                    <a
                                        href="https://github.com/aws/aws-encryption-sdk-dafny"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        AWS Encryption SDK for Dafny
                                    </a>{' '}
                                    — and in courses that introduce formal methods.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <aside className="h-100 rounded bg-body-tertiary p-4">
                                <h2 className="h5">At a glance</h2>
                                <ul className="mb-0 ps-3">
                                    <li className="mb-2">Programming language</li>
                                    <li className="mb-2">Specifications written in code</li>
                                    <li>Automated verification</li>
                                </ul>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="mb-5" aria-labelledby="about-history">
                    <div className="mb-3">
                        <h2 className="h3 mb-1" id="about-history">
                            A brief history
                        </h2>
                        <p className="text-body-secondary mb-0">
                            From a research prototype to a language taught at
                            universities and used in industry.
                        </p>
                    </div>
                    <div className="row g-3">
                        {milestones.map(({ title, period, description }) => (
                            <div className="col-md-4" key={title}>
                                <article className="h-100 rounded border p-4">
                                    <h3 className="h5 d-flex align-items-baseline justify-content-between gap-2">
                                        {title}
                                        <span className="small text-primary text-nowrap">
                                            {period}
                                        </span>
                                    </h3>
                                    <p className="text-body-secondary mb-0">
                                        {description}
                                    </p>
                                </article>
                            </div>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="about-comparison">
                    <div className="mb-3">
                        <h2 className="h3 mb-1" id="about-comparison">
                            How Dafny compares
                        </h2>
                        <p className="text-body-secondary mb-0">
                            Dafny checks preconditions at call sites and can prove
                            postconditions, loop invariants, and assertions before code
                            generation.
                            In C#, Java, and Python, correctness is more commonly
                            supported through types, tests, and optional analysis or
                            verification tools. Dafny's proofs cover the properties
                            specified in the code; they do not prove unspecified behavior
                            or replace integration and runtime testing.
                        </p>
                        
                    </div>
                    <div className="d-none d-md-block rounded border">
                        <table className="comparison-table table table-striped table-hover align-middle mb-0">
                            <caption className="visually-hidden">
                                Comparison of Dafny with other programming languages
                            </caption>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Language</th>
                                    {comparisonDimensions.map(({ key, label }) => (
                                        <th scope="col" key={key}>{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonLanguages.map((language) => (
                                    <tr key={language.name}>
                                        <th scope="row">{language.name}</th>
                                        {comparisonDimensions.map(({ key }) => (
                                            <td key={key}>{language[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-md-none">
                        {comparisonLanguages.map((language) => (
                            <article className="rounded border p-3 mb-3" key={language.name}>
                                <h3 className="h5">{language.name}</h3>
                                <dl className="mb-0">
                                    {comparisonDimensions.map(({ key, label }) => (
                                        <div className="mb-2" key={key}>
                                            <dt className="small">{label}</dt>
                                            <dd className="mb-0">{language[key]}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    )
}

export default About
