const bigNumberRequire = "const BigNumber = require('bignumber.js');";
const mainEntryPoints = {
    maze: /^_dafny\.HandleHaltExceptions\(\(\) => MazeSolver\.__default\.Main\(_dafny\.UnicodeFromMainArguments\(require\('process'\)\.argv\)\)\);\r?$/gm,
    travelingSalesman: /^_dafny\.HandleHaltExceptions\(\(\) => _module\.__default\.Main\(_dafny\.UnicodeFromMainArguments\(require\('process'\)\.argv\)\)\);\r?$/gm,
};

const mazeAdapter = `
export function solveMaze(openCells, start, end) {
    const rows = openCells.length;
    const columns = openCells[0] ? openCells[0].length : 0;
    const maze = _dafny.newArray(false, new BigNumber(rows), new BigNumber(columns));
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            maze.elmts[row][column] = openCells[row][column];
        }
    }
    const startPosition = _dafny.Tuple.of(
        new BigNumber(start[0]),
        new BigNumber(start[1]),
        _dafny.ZERO
    );
    const endPosition = _dafny.Tuple.of(
        new BigNumber(end[0]),
        new BigNumber(end[1]),
        _dafny.ZERO
    );
    const path = MazeSolver.__default.SolveMaze(maze, startPosition, endPosition);
    return path === null
        ? null
        : path.map((position) => [
            position[0].toNumber(),
            position[1].toNumber()
        ]);
}
`;

const travelingSalesmanAdapter = `
const travelingSalesmanGraph = _module.Graph.create_Graph(
    new BigNumber(4),
    _dafny.Seq.of(
        _dafny.Seq.of(_dafny.ZERO, new BigNumber(12), new BigNumber(8), new BigNumber(5)),
        _dafny.Seq.of(new BigNumber(8), new BigNumber(9), new BigNumber(7), new BigNumber(2)),
        _dafny.Seq.of(_dafny.ZERO, new BigNumber(2), new BigNumber(6), new BigNumber(10)),
        _dafny.Seq.of(_dafny.ONE, new BigNumber(2), _dafny.ONE, new BigNumber(8))
    )
);
travelingSalesmanGraph.dtor_cost.forEach((row, city) => {
    row[city] = undefined;
});

export function checkTour(tour) {
    const dafnyTour = _dafny.Seq.of(
        ...tour.map((city) => new BigNumber(city)),
    );
    return _module.__default.CheckCandidateTour(
        travelingSalesmanGraph,
        dafnyTour,
    );
}
`;

module.exports = function dafnyRuntimeLoader(source) {
    const isTravelingSalesman = /RudimentaryTravelingSalesman\.js$/i.test(
        this.resourcePath,
    );
    const runtimeName = isTravelingSalesman ? 'travelingSalesman' : 'maze';
    const mainEntryPoint = mainEntryPoints[runtimeName];
    const entryPoints = source.match(mainEntryPoint) ?? [];
    if (entryPoints.length !== 1) {
        throw new Error(`Expected exactly one Dafny ${runtimeName} command-line entry point.`);
    }
    if (!source.includes(bigNumberRequire)) {
        throw new Error(`Could not find the Dafny ${runtimeName} BigNumber dependency.`);
    }

    const moduleSource = source
        .replace(bigNumberRequire, "import BigNumber from 'bignumber.js';")
        .replace(mainEntryPoint, '');

    return `${moduleSource}\n${isTravelingSalesman ? travelingSalesmanAdapter : mazeAdapter}`;
};
