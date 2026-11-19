# React + TypeScript static site template

React 19 + TypeScript + Bootstrap 5, bundled with webpack, using **HashRouter**
so the built site runs on any static file server.

## Commands

```sh
npm install       # install dependencies
npm run dev       # dev server with hot reload at http://localhost:8080
npm run build     # type-check and build production files into dist/
npm run typecheck # type-check only
```

## Deploying

1. Run `npm run build`.
2. Upload the **contents of `dist/`** to the CS Web server.

Everything in `dist/` uses relative URLs, so it works from the server root or
from a subdirectory.

## Structure

```
src/
  main.tsx      # entry point: mounts <HashRouter><App /></HashRouter>, imports Bootstrap CSS
  App.tsx       # shell (nav + <Routes>); each page is lazy-loaded as its own chunk
  pages/
    Home.tsx     # /
    About.tsx    # /about
    NotFound.tsx # 404 fallback
  imgs/
    dafny-favicon.svg # site icon, linked from index.html
  index.css     # custom styles (loaded after Bootstrap)
  index.html    # HTML template (webpack injects the bundle and the favicon URL)
webpack.config.js
tsconfig.json
```

## Styling with Bootstrap

Production builds ship only the Bootstrap rules you actually use: webpack runs
PurgeCSS over the extracted CSS (see `webpack.config.js`), keeping every class
found in `src/` plus a small safelist of classes that Bootstrap's JS adds at
runtime (transition states, `active` from `NavLink`, tooltip/popover markup).
If you build class names dynamically (template literals, component libraries),
add them to that `safelist` or they will be stripped. Dev builds keep the full
CSS.

## Bootstrap JavaScript

Bootstrap's JS (dropdowns, modals, tooltips, ...) is **not** bundled by
default. Import only the components you use — each file registers its own
`data-bs-*` listeners, so the markup works as soon as it is imported:

```ts
import Modal from 'bootstrap/js/src/modal.js'
import Dropdown from 'bootstrap/js/src/dropdown.js' // also pulls in Popper
```

## Adding a route

1. Create `src/pages/YourPage.tsx` with a default export.
2. Register it in `src/App.tsx` — one lazy import plus one `<Route>`:

   ```tsx
   const YourPage = lazy(() =>
     import(/* webpackChunkName: "your-page" */ './pages/YourPage'),
   )
   // inside <Routes>:
   <Route path="/your-page" element={<YourPage />} />
   ```

3. Link to it with `<NavLink to="/your-page">`.

Every page becomes its own chunk, fetched the first time someone visits it,
and webpack automatically extracts code shared between pages into a shared
chunk, so lazy loading never duplicates code.

## Adding assets

Import images/fonts in TS/TSX and they get hashed filenames automatically:

```ts
import logo from './logo.png'
```

## Favicon

The favicon is referenced from the HTML template with `<%= require(...) %>`,
so webpack emits the file and the `href` always matches its content hash:

```html
<link rel="icon" href="<%= require('./imgs/dafny-favicon.svg') %>" type="image/svg+xml">
```

To swap the icon, replace `src/imgs/dafny-favicon.svg` (keep the name, or
update the `require` path). No import in `main.tsx` is needed. Browsers that
do not support SVG icons can be given an additional `<link>` to a `.png`
file with `rel="alternate icon"`.
