import { lazy, Suspense, useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
// Each route is split into its own chunk and loaded the first time it is
// visited. See the "Adding a route" section of the README.
const Home = lazy(() =>
    import(/* webpackChunkName: "home" */ './pages/Home'),
)
const About = lazy(() =>
    import(/* webpackChunkName: "about" */ './pages/About'),
)
const Documents = lazy(() =>
    import(/* webpackChunkName: "documents" */ './pages/Documents'),
)
const Employability = lazy(() =>
    import(/* webpackChunkName: "employability" */ './pages/Employability'),
)
const Install = lazy(() =>
    import(/* webpackChunkName: "install" */ './pages/Install'),
)
const Maze = lazy(() =>
    import(/* webpackChunkName: "maze" */ './pages/Maze'),
)
const TravelingSalesman = lazy(() =>
    import(/* webpackChunkName: "tsp" */ './pages/TravelingSalesman'),
)
const Source = lazy(() =>
    import(/* webpackChunkName: "source" */ './pages/SourcesPage'),
)
const NotFound = lazy(() =>
    import(/* webpackChunkName: "not-found" */ './pages/NotFound'),
)

const pageTitles: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/documents': 'Documents',
    '/employability': 'Employability',
    '/install': 'Install',
    '/maze': 'Maze Solver',
    '/tsp': 'Traveling Salesman',
    '/code': 'Source Code',
}

function PageLoading() {
    return (
        <div className="card">
            <div className="card-body">Loading…</div>
        </div>
    )
}

export default function App() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [showScrollTop, setShowScrollTop] = useState(false)
    const location = useLocation()
    const closeNav = () => setIsNavExpanded(false)
    const examplesActive =
        location.pathname === '/maze' ||
        location.pathname === '/tsp' ||
        location.pathname === '/code'

    useEffect(() => {
        const pageName = pageTitles[location.pathname] ?? 'Page Not Found'
        document.title = `${pageName} - Dafny the Language`
    }, [location.pathname])

    useEffect(() => {
        const sectionId = location.hash.slice(1)
        if (!sectionId) return

        let observer: MutationObserver | undefined
        const scrollToSection = () => {
            const section = document.getElementById(decodeURIComponent(sectionId))
            if (!section) return false

            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return true
        }

        if (scrollToSection()) return

        observer = new MutationObserver(() => {
            if (scrollToSection()) observer?.disconnect()
        })
        observer.observe(document.querySelector('main') ?? document.body, {
            childList: true,
            subtree: true,
        })

        return () => observer?.disconnect()
    }, [location.pathname, location.hash])

    useEffect(() => {
        if (location.hash) return
        window.scrollTo(0, 0)
    }, [location.key, location.hash])

    useEffect(() => {
        const updateScrollTopVisibility = () => {
            setShowScrollTop(window.scrollY > 0)
        }

        updateScrollTopVisibility()
        window.addEventListener('scroll', updateScrollTopVisibility, { passive: true })
        return () => window.removeEventListener('scroll', updateScrollTopVisibility)
    }, [])

    return (
        <div className="container py-4 text-center align-items-center">
            <nav
                className="site-navigation navbar navbar-expand-md bg-body-tertiary rounded mb-4 px-3"
                aria-label="Main navigation"
            >
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="primaryNavigation"
                    aria-expanded={isNavExpanded}
                    aria-label="Toggle navigation"
                    onClick={() => setIsNavExpanded((expanded) => !expanded)}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className={`collapse navbar-collapse${isNavExpanded ? ' show' : ''}`}
                    id="primaryNavigation"
                >
                    <ul className="navbar-nav nav-pills">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end onClick={closeNav}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about" onClick={closeNav}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/documents" onClick={closeNav}>
                                Documents
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/install" onClick={closeNav}>
                                Install
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/employability" onClick={closeNav}>
                                Employability
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <button
                                className={`nav-link dropdown-toggle${examplesActive ? ' active' : ''}`}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Examples
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/maze"
                                        onClick={closeNav}
                                    >
                                        Maze Solver
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/tsp"
                                        onClick={closeNav}
                                    >
                                        Traveling Salesman
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/code"
                                        onClick={closeNav}
                                    >
                                        Source Code
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>
                <Suspense fallback={<PageLoading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/documents" element={<Documents />} />
                        <Route path="/employability" element={<Employability />} />
                        <Route path="/install" element={<Install />} />
                        <Route path="/maze" element={<Maze />} />
                        <Route path="/tsp" element={<TravelingSalesman />} />
                        <Route
                            path="/code"
                            element={<Source />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            <button
                className={`scroll-to-top btn btn-primary shadow${showScrollTop ? ' is-visible' : ''}`}
                type="button"
                aria-label="Scroll to top"
                tabIndex={showScrollTop ? 0 : -1}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <span aria-hidden="true">↑</span>
            </button>
        </div>
    )
}
