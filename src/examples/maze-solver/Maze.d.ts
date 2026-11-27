export type MazeSolver = (
    maze: boolean[][],
    start: [number, number],
    end: [number, number],
) => [number, number][] | null;

export function solveMaze(
    maze: boolean[][],
    start: [number, number],
    end: [number, number],
): [number, number][] | null;
