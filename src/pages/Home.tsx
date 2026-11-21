import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="card">
            <div className="card-body">
                <section className="py-4 py-md-5">
                    <h1 className="display-4 fw-bold">
                        Write code. Prove it meets its specifications.
                    </h1>
                    <p className="lead mx-auto" style={{ maxWidth: '42rem' }}>
                        Dafny is a programming language with an automated verifier that
                        checks code against specifications. It can catch errors such as
                        out-of-bounds access before runtime, helping prevent coding-related
                        crashes.
                    </p>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                        <Link className="btn btn-primary" to="/maze">
                            Try the Maze Solver
                        </Link>
                        <Link className="btn btn-outline-primary" to="/code">
                            Explore Dafny Source
                        </Link>
                    </div>
                </section>

                <div className="row g-3 text-start mt-2">
                    <div className="col-md-6">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">Describe what your code should do</h2>
                                <p className="card-text mb-0">
                                    Dafny lets you express expectations about your program, such
                                    as preconditions, postconditions, and loop invariants.
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="col-md-6">
                        <section className="card h-100">
                            <div className="card-body">
                                <h2 className="h5 card-title">Explore verification in action</h2>
                                <p className="card-text mb-0">
                                    Try the maze example, then browse its Dafny source to see how
                                    a program and its specifications fit together.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
