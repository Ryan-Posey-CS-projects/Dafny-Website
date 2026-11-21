import mazeSourceUrl from "../examples/Maze-Solver/Maze.dfy";
import queueSourceUrl from "../examples/Maze-Solver/Queue.dfy";
import Source from "./Source";

const sourceProjects = [
    {
        id: "maze-solver",
        label: "Maze Solver",
        files: [
            { label: "Maze.dfy", sourceUrl: mazeSourceUrl },
            { label: "Queue.dfy", sourceUrl: queueSourceUrl },
        ],
    },
];

export default function SourcesPage() {
    return <Source projects={sourceProjects} />;
}
