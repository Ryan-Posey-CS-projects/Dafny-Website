import mazeSourceUrl from "../examples/maze-solver/Maze.dfy";
import queueSourceUrl from "../examples/maze-solver/Queue.dfy";
import sumOfTwoEvensSourceUrl from "../examples/beginner/sumOfTwoEvens.dfy";
import helloWorldSourceUrl from "../examples/beginner/firstprog.dfy";
import helloSourceUrl from "../examples/beginner/Hello.dfy";
import introSourceUrl from "../examples/beginner/Intro.dfy";
import travelingSalesmanSourceUrl from "../examples/intermediate/RudimentaryTravelingSalesman.dfy"
import Source from "./Source";

const sourceProjects = [
    {
        id: "beginner-code",
        label: "Beginner Code",
        files: [
            { label: "Hello.dfy", sourceUrl: helloSourceUrl },
            { label: "HelloWorld.dfy", sourceUrl: helloWorldSourceUrl },
            { label: "SumOfTwoEvens.dfy", sourceUrl: sumOfTwoEvensSourceUrl },
            { label: "Intro.dfy", sourceUrl: introSourceUrl, hasMain: false }
        ],
    },
    {
        id: "intermediate-code",
        label: "Intermediate Code",
        files: [
            { label: "TravelingSalesman.dfy", sourceUrl: travelingSalesmanSourceUrl }
        ],
    },
    {
        id: "maze-solver",
        label: "Maze Solver",
        files: [
            { label: "Maze.dfy", sourceUrl: mazeSourceUrl },
            { label: "Queue.dfy", sourceUrl: queueSourceUrl, hasMain: false },
        ],
    },
];

export default function SourcesPage() {
    return <Source projects={sourceProjects} />;
}
