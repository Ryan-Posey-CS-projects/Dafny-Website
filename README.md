# Dafny Website

A React and TypeScript website for learning Dafny, with an interactive maze
solver and a source browser that can grow to include more examples. It uses
Bootstrap 5, webpack, and React Router's `HashRouter`, so the built site works
on static hosting.

## Pages

| Page | Route |
| --- | --- |
| Home | `#/` |
| About Dafny | `#/about` |
| Maze Solver | `#/maze` |
| Source Code | `#/code` |

## Local development

```sh
npm install
npm run dev       # Start the development server at http://localhost:8080
npm run typecheck # Type-check TypeScript
npm run build     # Build the production site into dist/
```

`npm run build` creates the production site but does not run the typecheck.
Run `npm run typecheck` separately when you want to check TypeScript.

## Deploying

### GitHub Pages

Deployment is manual; pushing commits does not publish the site.

1. In GitHub, open **Actions** and select **Deploy to GitHub Pages**.
2. Select **Run workflow**, choose the branch to publish, and run it.
3. The workflow builds the site and publishes the contents of `dist/` to the
   `gh-pages` branch.

For the first deployment, configure **Settings → Pages** to deploy from the
`gh-pages` branch and `/(root)`. The workflow creates the branch when it runs.

### CS Web server

Run `npm run build`, then upload the **contents of `dist/`** to the server.
The build uses relative asset URLs, so it can be hosted at the server root or
in a subdirectory.

## Project structure

```text
src/
  App.tsx              # Navigation and routes
  main.tsx             # React entry point and HashRouter
  pages/
    Home.tsx           # Landing page
    About.tsx          # About Dafny
    Maze.tsx           # Interactive maze solver
    SourcesPage.tsx    # Loads Dafny source files
    Source.tsx         # Project/file selection and source display
    SourceCodePage.tsx # Syntax-highlighted source viewer
    NotFound.tsx       # Fallback for unknown routes
  examples/
    maze.dfy           # Maze solver Dafny source
    Queue.dfy          # Queue Dafny source
  index.css            # Site styles
  index.html           # Webpack HTML template
webpack.config.js
```

## Adding Dafny examples

To add source code to the browser:

1. Add the `.dfy` file under `src/examples/`.
2. Import it in `src/pages/SourcesPage.tsx`.
3. Add it to the `sourceProjects` list, grouping it with related files or
   creating a new project entry.

The webpack configuration handles `.dfy` files as assets. For an example that
needs its own interactive UI, create a page component and register a route as
described below.

## Adding a route

1. Create a page component in `src/pages/`.
2. Lazy-load it and add a `<Route>` in `src/App.tsx`.
3. Link to it with a React Router `Link` or `NavLink`.

The site uses hash-based routes, so use paths such as `/your-page`; the browser
URL will appear as `#/your-page`.
