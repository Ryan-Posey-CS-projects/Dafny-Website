import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap's JS is not bundled by default. To use a data-bs-* component,
// import only the plugin you need (each registers its own data-api).
// See the "Bootstrap JavaScript" section of the README.
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
