# Dafny Website

A React and TypeScript website for learning Dafny. It includes interactive maze
and Traveling Salesman visualizations, plus a source browser with Dafny syntax
highlighting. The site uses Bootstrap 5, webpack, and React Router's `HashRouter`,
so it can be hosted as a static site.

## Pages

| Page | Route |
| --- | --- |
| Home | `#/` |
| About Dafny | `#/about` |
| Documents | `#/documents` |
| Install | `#/install` |
| Employability | `#/employability` |
| Maze Solver | `#/maze` |
| Traveling Salesman | `#/tsp` |
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
| `npm start` | Start webpack's development server in production mode. |
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
    deploy.yml              # Manual GitHub Pages deployment
src/
  App.tsx                   # Navigation and lazy-loaded routes
  main.tsx                  # React entry point and HashRouter
  browser-process.ts        # Browser-compatible process shim
  dafny-runtime-loader.cjs  # Bundles compiled Dafny examples at build time
  index.css                 # Site styles
  index.html                # Webpack HTML template (favicon included here)
  assets.d.ts               # Asset module declarations
  imgs/                     # Favicon (SVG + PNG)
  pages/
    Home.tsx                # Landing page with code sample
    About.tsx               # About Dafny
    Documents.tsx           # Docs, tutorials, and papers
    Install.tsx             # Installation guide
    Employability.tsx       # Careers and skills
    Maze.tsx                # Interactive maze UI using the compiled solver
    TravelingSalesman.tsx   # Interactive traveling salesman visualization
    SourcesPage.tsx         # Loads Dafny source files
    Source.tsx              # Project/file selection and display
    SourceCodePage.tsx      # Syntax-highlighted source viewer
    DafnyCodeViewer.tsx     # Shared code viewer (Dafny grammar lives here)
    NotFound.tsx            # Fallback for unknown routes
  examples/
    beginner/
        Hello.dfy           # Install page verification sample
        firstprog.dfy       # HelloWorld source browser example
        Intro.dfy           # Home page code sample
        sumOfTwoEvens.dfy   # Sum of two evens source browser example
    maze-solver/
        Maze.dfy            # Maze solver Dafny source
        Queue.dfy           # Queue Dafny source
        Maze.js             # Compiled solver loaded by the maze page
        Maze-js.dtr         # Dafny test/result artifact
    intermediate/
        RudimentaryTravelingSalesman.dfy # Traveling Salesman Dafny source
        RudimentaryTravelingSalesman.js  # Compiled checker loaded by the page
        RudimentaryTravelingSalesman-js.dtr # Dafny test/result artifact
package.json                # Dependencies and commands
tsconfig.json               # TypeScript configuration
webpack.config.js           # Build, asset, and PurgeCSS configuration
```

Webpack bundles the generated maze and traveling-salesman modules through
`dafny-runtime-loader.cjs`, which removes their command-line entry points and
exposes browser-callable adapters. The generated `.js` files remain unchanged,
and both examples run without runtime source evaluation under the site's
Content Security Policy.

## Adding Dafny code

All Dafny code shown on the site lives in project folders under
`src/examples/`, never inline in TSX. Webpack copies `.dfy` files to `dist/` as assets, and
`DafnyCodeViewer` displays one either by fetching its URL (`sourceUrl`) or from
a string (`sourceCode`, avoid for new code). To add syntax highlighting rules,
update the Dafny grammar in `src/pages/DafnyCodeViewer.tsx`.

### In the source browser

1. Add the `.dfy` file to the appropriate project folder, such as
    `src/examples/beginner/` or `src/examples/Maze-Solver/`.
2. Import it in `src/pages/SourcesPage.tsx`.
3. Add it to the `sourceProjects` list, grouping it with related files or
    creating a new project entry.

### Embedded in a page

1. Add the `.dfy` file under `src/examples/beginner/` or another matching
    project folder.
2. Import its URL in the page:
    `import sampleUrl from '../examples/beginner/Sample.dfy'`.
3. Pass it to `DafnyCodeViewer` as `sourceUrl`, as Home and Install do with
    `Intro.dfy` and `Hello.dfy`.

## Adding a route

1. Create a page component in `src/pages/`.
2. Lazy-load it and add a `<Route>` in `src/App.tsx`.
3. Link to it with a React Router `Link` or `NavLink`.

Routes use hash-based paths, such as `/your-page`; the browser URL appears as
`#/your-page`.
