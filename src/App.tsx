import { lazy, Suspense, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
// Each route is split into its own chunk and loaded the first time it is
// visited. See the "Adding a route" section of the README.
const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ './pages/Home'),
)
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ './pages/About'),
)
const Maze = lazy(() =>
  import(/* webpackChunkName: "maze" */ './pages/Maze'),
)
const Source = lazy(() =>
  import(/* webpackChunkName: "source" */ './pages/SourcesPage'),
)
const NotFound = lazy(() =>
  import(/* webpackChunkName: "not-found" */ './pages/NotFound'),
)

function PageLoading() {
  return (
    <div className="card">
      <div className="card-body">Loading…</div>
    </div>
  )
}

export default function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const location = useLocation()
  const closeNav = () => setIsNavExpanded(false)
  const examplesActive =
    location.pathname === '/maze' || location.pathname === '/code'

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
            <Route path="/maze" element={<Maze />} />
            <Route
              path="/code"
              element={<Source />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
