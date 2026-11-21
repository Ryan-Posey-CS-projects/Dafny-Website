# Dafny Website

A React and TypeScript website for learning Dafny. It includes an interactive
maze solver and a source browser with Dafny syntax highlighting. The site uses
Bootstrap 5, webpack, and React Router's `HashRouter`, so it can be hosted as a
static site.

## Pages

| Page | Route |
| --- | --- |
| Home | `#/` |
| About Dafny | `#/about` |
| Maze Solver | `#/maze` |
| Source Code | `#/code` |

## Development

Use Node.js 22 (the version used by the deployment workflow), then install the
dependencies:

```sh
npm install
```

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server at <http://localhost:8080>. |
| `npm run typecheck` | Check TypeScript types without building. |
| `npm run build` | Create the production site in `dist/`. |

The production build also checks TypeScript through webpack's `ts-loader`.

## Deployment

### GitHub Pages

Deployment is manual; pushing commits does not publish the site.

1. In GitHub, open **Actions** and select **Deploy to GitHub Pages**.
2. Select **Run workflow**, choose the branch to publish, and run it.
3. The workflow builds the site and publishes `dist/` to the `gh-pages` branch.

For the first deployment, configure **Settings → Pages** to deploy from the
`gh-pages` branch and `/(root)`. The workflow creates the branch when it runs.

### CS Web server

Run `npm run build`, then upload the contents of `dist/` to the server. Asset
URLs are relative, so the site can be hosted at the server root or in a
subdirectory.

## Project structure

```text
.github/
  workflows/
    deploy.yml          # Manual GitHub Pages deployment
src/
  App.tsx               # Navigation and routes
  main.tsx              # React entry point and HashRouter
  browser-process.ts    # Browser-compatible process shim
  index.css             # Site styles
  index.html            # Webpack HTML template
  assets.d.ts           # Asset module declarations
  pages/
    Home.tsx            # Landing page
    About.tsx           # About Dafny
    Maze.tsx            # Interactive maze solver
    SourcesPage.tsx     # Loads Dafny source files
    Source.tsx          # Project/file selection and display
    SourceCodePage.tsx  # Syntax-highlighted source viewer
    NotFound.tsx        # Fallback for unknown routes
  examples/
    maze.dfy            # Maze solver Dafny source
    Queue.dfy           # Queue Dafny source
package.json            # Dependencies and commands
tsconfig.json           # TypeScript configuration
webpack.config.js       # Build and asset configuration
```

## Adding Dafny examples

1. Add the `.dfy` file under `src/examples/`.
2. Import it in `src/pages/SourcesPage.tsx`.
3. Add it to the `sourceProjects` list, grouping it with related files or
   creating a new project entry.

Webpack copies `.dfy` files to `dist/` as assets. To add syntax highlighting
rules, update the Dafny grammar in `src/pages/SourceCodePage.tsx`.

## Adding a route

1. Create a page component in `src/pages/`.
2. Lazy-load it and add a `<Route>` in `src/App.tsx`.
3. Link to it with a React Router `Link` or `NavLink`.

Routes use hash-based paths, such as `/your-page`; the browser URL appears as
`#/your-page`.
