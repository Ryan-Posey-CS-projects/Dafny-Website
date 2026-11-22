import mazeSourceUrl from "../examples/Maze-Solver/Maze.dfy";
import queueSourceUrl from "../examples/Maze-Solver/Queue.dfy";
import sumOfTwoEvensSourceUrl from "../examples/sumOfTwoEvens.dfy";
import helloWorldSourceUrl from "../examples/firstprog.dfy"
import helloSourceUrl from "../examples/Hello.dfy"
import introSourceUrl from "../examples/Intro.dfy"

import Source from "./Source";

const sourceProjects = [
    {
        id: "beginner-code",
        label: "Beginner Code",
        files: [
            { label: "Hello.dfy", sourceUrl: helloSourceUrl },
            { label: "HelloWorld.dfy", sourceUrl: helloWorldSourceUrl },
            { label: "SumOfTwoEvens.dfy", sourceUrl: sumOfTwoEvensSourceUrl },
            { label: "Intro.dfy", sourceUrl: introSourceUrl }
        ],
    },
    {
        id: "intermediate-code",
        label: "Intermediate Code",
        files: [],
    },
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
