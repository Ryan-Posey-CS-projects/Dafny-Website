import BigNumber from "bignumber.js";

export type MazeSolver = {
    solve(maze: boolean[][], start: [number, number], end: [number, number]): [number, number][] | null;
};

export async function loadMazeSolver(sourceUrl: string): Promise<MazeSolver> {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const source = (await response.text())
        .replace("const BigNumber = require('bignumber.js');", "BigNumber = arguments[0];")
        .replace(/_dafny\.HandleHaltExceptions\([\s\S]*$/, "");
    const createSolver = new Function(
        "BigNumber",
        `${source}
        return {
            solve(openCells, start, end) {
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
        };`,
    ) as (bigNumber: typeof BigNumber) => MazeSolver;

    return createSolver(BigNumber);
}
