import { lazy, Suspense } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
// Each route is split into its own chunk and loaded the first time it is
// visited. See the "Adding a route" section of the README.
const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ './pages/Home'),
)
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ './pages/About'),
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
  return (
    <div className="container py-4">
      <nav className="nav nav-pills mb-4">
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </nav>
      <main>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
