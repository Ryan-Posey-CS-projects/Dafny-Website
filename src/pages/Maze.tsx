import { useEffect, useLayoutEffect, useRef, useState } from "react";
let newMaze = true;
const gridSizeOptions = Array.from({ length: 46 }, (_, index) => index + 5);
const defaultMazeLayout = [
    "S      ########",
    "## ### ########",
    "## ### ### ####",
    "###### ### ####",
    "######       ##",
    "######## ### ##",
    "########   # ##",
    "############ ##",
    "##           ##",
    "#### ##### ####",
    "#### #      ###",
    "#### # #### ###",
    "####           ",
    "############## ",
    "##############E",
];

function Maze() {
    newMaze = true;
    const [rows, setRows] = useState(15);
    const [cols, setCols] = useState(15);
    const autoSolve = true;

    return (
        <div className="card maze-solver-card">
            <div className="card-body">
                <h1 className="card-title">Maze Solver</h1>
                <p className="card-text">
                    Prepare to be amazed!
                </p>
                <div>
                    <p>
                        <span className="d-lg-none">
                            Check a square to add or remove an obstacle. Green shows the start and red shows the exit. 
                        </span>
                        <span className="d-none d-lg-inline">
                            Check a square to toggle an obstacle. Drag the green start or red exit marker to move it.
                        </span>
                        {' '}The path will be shown in yellow
                    </p>
                    <div className="maze-size-controls d-none d-md-flex justify-content-center align-items-end gap-3 mb-3">
                        <div className="maze-size-controls justify-content-center align-items-end gap-3 mb-3">
                            <label className="form-label" htmlFor="mazeRows">Rows</label>
                            <select
                                className="form-select"
                                id="mazeRows"
                                value={rows}
                                onChange={(event) => setRows(Number(event.target.value))}
                            >
                                {gridSizeOptions.map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <div className="maze-size-controls justify-content-center align-items-end gap-3 mb-3">
                            <label className="form-label" htmlFor="mazeColumns">Columns</label>
                            <select
                                className="form-select"
                                id="mazeColumns"
                                value={cols}
                                onChange={(event) => setCols(Number(event.target.value))}
                            >
                                {gridSizeOptions.map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <MazeCreator key={`${rows}-${cols}`} rows={rows} cols={cols} autoSolve={autoSolve} />
                </div>
            </div>
        </div>
    )
}

function MazeCreator(props: { rows: number; cols: number; autoSolve: boolean }) {
    const { rows, cols, autoSolve } = props;
    const [start, setStart] = useState<Point>([0, 0]);
    const [end, setEnd] = useState<Point>([cols - 1, rows - 1]);
    const [solveResult, setSolveResult] = useState<SolveResult | null>(null);
    const [mazeRevision, setMazeRevision] = useState(0);
    const maze: boolean[][] =
        rows === defaultMazeLayout.length && cols === defaultMazeLayout[0].length && newMaze
            ? defaultMazeLayout.map((line) =>
                Array.from(line, (cell) => cell === "#")
            )
            : Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));
    const gridRef = useRef<HTMLDivElement>(null);
    const solveButtonRef = useRef<HTMLButtonElement>(null);
    const solveResultRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!autoSolve) return;

        const timeout = window.setTimeout(() => {
            setSolveResult(solveMaze());
        }, 250);

        return () => window.clearTimeout(timeout);
    }, [autoSolve, mazeRevision]);

    useLayoutEffect(() => {
        const grid = gridRef.current;
        const solveButton = solveButtonRef.current;
        if (!grid || !solveButton) return;

        let resizeFrame = 0;
        const updateGridSize = () => {
            newMaze = false;
            const gridTop = grid.getBoundingClientRect().top;
            const pixels = (value: string) => Number.parseFloat(value) || 0;
            const resultMessage = solveResultRef.current;
            const resultStyle = resultMessage
                ? window.getComputedStyle(resultMessage)
                : null;
            const resultSpace =
                window.matchMedia("(max-width: 767.98px)").matches &&
                    resultMessage &&
                    resultStyle
                    ? resultMessage.getBoundingClientRect().height +
                    pixels(resultStyle.marginTop) +
                    pixels(resultStyle.marginBottom)
                    : 0;
            const availableHeight = Math.max(
                0,
                window.innerHeight -
                gridTop -
                solveButton.offsetHeight -
                64 -
                resultSpace,
            );
            const availableWidth = grid.parentElement?.clientWidth ?? window.innerWidth;
            const gridStyle = window.getComputedStyle(grid);
            const firstRow = grid.querySelector<HTMLElement>(".maze-row");
            const rowStyle = firstRow ? window.getComputedStyle(firstRow) : gridStyle;
            const horizontalSpace =
                pixels(gridStyle.paddingLeft) +
                pixels(gridStyle.paddingRight) +
                pixels(gridStyle.borderLeftWidth) +
                pixels(gridStyle.borderRightWidth) +
                Math.max(0, cols - 1) * pixels(rowStyle.columnGap);
            const verticalSpace =
                pixels(gridStyle.paddingTop) +
                pixels(gridStyle.paddingBottom) +
                pixels(gridStyle.borderTopWidth) +
                pixels(gridStyle.borderBottomWidth) +
                Math.max(0, rows - 1) * pixels(gridStyle.rowGap);
            const cellSizeByHeight = Math.max(
                0,
                (availableHeight - verticalSpace) / rows,
            );
            const widthByHeight = horizontalSpace + cols * cellSizeByHeight;
            const size = Math.min(availableWidth, widthByHeight);
            const mobileSize = window.matchMedia("(max-width: 767.98px)").matches
                ? availableWidth
                : size;
            const sizeValue = `${mobileSize}px`;

            if (grid.style.getPropertyValue("--maze-available-size") !== sizeValue) {
                grid.style.setProperty("--maze-available-size", sizeValue);
            }
        };

        const scheduleGridSizeUpdate = () => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(updateGridSize);
        };

        scheduleGridSizeUpdate();
        window.addEventListener("resize", scheduleGridSizeUpdate);
        const resizeObserver = new ResizeObserver(scheduleGridSizeUpdate);
        if (grid.parentElement) resizeObserver.observe(grid.parentElement);

        return () => {
            cancelAnimationFrame(resizeFrame);
            window.removeEventListener("resize", scheduleGridSizeUpdate);
            resizeObserver.disconnect();
        };
    }, [cols, rows, solveResult]);

    const updateCoordinate = (
        setter: (point: Point) => void,
        point: Point,
        axis: 0 | 1,
        value: number,
        max: number
    ) => {
        markMazeChanged();
        const next = [...point] as Point;
        next[axis] = Math.max(0, Math.min(max, value));
        setter(next);
    };

    const markMazeChanged = () => {
        clearSolutionPath();
        setSolveResult(null);
        setMazeRevision((revision) => revision + 1);
    };
    const fillMaze = (isObstacle: boolean) => {
        const obstacles = gridRef.current?.querySelectorAll<HTMLInputElement>(
            ".maze-cell:not(.maze-cell--start):not(.maze-cell--end)"
        ) ?? [];
        clearSolutionPath();
        for (const obstacle of obstacles) obstacle.checked = isObstacle;
        markMazeChanged();
    };

    return (
        <>
            <div className="maze-coordinate-controls">
                <div className="maze-coordinate-field">
                    <label className="form-label mb-0" htmlFor="StartX">Start X:</label>
                    <input className="form-control form-control-sm" type="number" name="StartX" id="StartX" min={1} max={cols} step={1} value={start[0] + 1} onChange={(event) => updateCoordinate(setStart, start, 0, Number(event.target.value) - 1, cols - 1)} />
                </div>
                <div className="maze-coordinate-field">
                    <label className="form-label mb-0" htmlFor="StartY">Start Y:</label>
                    <input className="form-control form-control-sm" type="number" name="StartY" id="StartY" min={1} max={rows} step={1} value={start[1] + 1} onChange={(event) => updateCoordinate(setStart, start, 1, Number(event.target.value) - 1, rows - 1)} />
                </div>
                <div className="maze-coordinate-field">
                    <label className="form-label mb-0" htmlFor="EndX">End X:</label>
                    <input className="form-control form-control-sm" type="number" name="EndX" id="EndX" min={1} max={cols} step={1} value={end[0] + 1} onChange={(event) => updateCoordinate(setEnd, end, 0, Number(event.target.value) - 1, cols - 1)} />
                </div>
                <div className="maze-coordinate-field">
                    <label className="form-label mb-0" htmlFor="EndY">End Y:</label>
                    <input className="form-control form-control-sm" type="number" name="EndY" id="EndY" min={1} max={rows} step={1} value={end[1] + 1} onChange={(event) => updateCoordinate(setEnd, end, 1, Number(event.target.value) - 1, rows - 1)} />
                </div>
            </div>
            <div
                className="maze-grid"
                ref={gridRef}
                role="group"
                aria-label="Maze grid"
                onDragStart={(event) => {
                    if (!(event.target instanceof Element)) {
                        event.preventDefault();
                        return;
                    }

                    const marker = event.target.closest(".maze-cell--start, .maze-cell--end");
                    if (!marker) {
                        event.preventDefault();
                        return;
                    }

                    event.dataTransfer.setData(
                        "text/plain",
                        marker.classList.contains("maze-cell--start") ? "start" : "end"
                    );
                    event.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                    event.preventDefault();
                    if (!(event.target instanceof Element)) return;

                    const target = event.target.closest(".maze-cell");
                    if (!(target instanceof HTMLInputElement) || target.checked) return;
                    const row = Number(target.dataset.row);
                    const col = Number(target.dataset.col);
                    if (!Number.isInteger(row) || !Number.isInteger(col)) return;

                    const marker = event.dataTransfer.getData("text/plain");
                    if (
                        marker === "start" &&
                        (col !== end[0] || row !== end[1]) &&
                        (col !== start[0] || row !== start[1])
                    ) {
                        markMazeChanged();
                        setStart([col, row]);
                    } else if (
                        marker === "end" &&
                        (col !== start[0] || row !== start[1]) &&
                        (col !== end[0] || row !== end[1])
                    ) {
                        markMazeChanged();
                        setEnd([col, row]);
                    }
                }}
            >
                {maze.map((row, rowIndex) => (
                    <div
                        className="maze-row"
                        key={rowIndex}
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                    >
                        {row.map((cell, colIndex) => (
                            rowIndex === start[1] && colIndex === start[0] ? (
                                <StartCell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
                            ) : rowIndex === end[1] && colIndex === end[0] ? (
                                <EndCell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
                            ) : (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    checked={cell}
                                    row={rowIndex}
                                    col={colIndex}
                                    onChange={markMazeChanged}
                                />
                            )
                        ))}
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={() => fillMaze(true)}>
                    Fill
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => fillMaze(false)}>
                    Clear
                </button>

            </div>
            {solveResult && (
                <p
                    ref={solveResultRef}
                    className={`maze-solve-result ${solveResult.solved ? "text-success" : "text-danger"}`}
                    role="status"
                    aria-live="polite"
                >
                    {solveResult.message}
                </p>
            )}
        </>
    )
}
function StartCell(props: { row: number; col: number }) {
    return (
        <input type="checkbox" id="start" className="maze-cell maze-cell--start" data-row={props.row} data-col={props.col} aria-label={`Start at row ${props.row + 1}, column ${props.col + 1}`} checked={false} readOnly draggable onClick={(event) => event.preventDefault()} />
    )
}
function EndCell(props: { row: number; col: number }) {
    return (
        <input type="checkbox" id="end" className="maze-cell maze-cell--end" data-row={props.row} data-col={props.col} aria-label={`Exit at row ${props.row + 1}, column ${props.col + 1}`} checked={false} readOnly draggable onClick={(event) => event.preventDefault()} />
    )
}
function Cell(props: {
    key?: string;
    checked: boolean;
    row: number;
    col: number;
    onChange: () => void;
}) {
    return (
        <input
            type="checkbox"
            className="maze-cell"
            data-row={props.row}
            data-col={props.col}
            aria-label={`Obstacle at row ${props.row + 1}, column ${props.col + 1}`}
            defaultChecked={props.checked}
            onChange={(event) => {
                const cell = event.currentTarget;
                if (cell.checked && cell.dataset.solutionPath === "true") {
                    clearSolutionPath(cell);
                } else {
                    cell.classList.remove("maze-cell--path");
                    delete cell.dataset.solutionPath;
                }
                props.onChange();
            }}
        />
    )
}

type Point = [number, number];
type SolveResult = { solved: boolean; message: string };

function clearSolutionPath(preserveObstacle?: HTMLInputElement) {
    const pathCells = document.querySelectorAll<HTMLInputElement>(
        '.maze-cell[data-solution-path="true"]'
    );
    for (const cell of pathCells) {
        if (cell !== preserveObstacle) cell.checked = false;
        cell.classList.remove("maze-cell--path");
        delete cell.dataset.solutionPath;
    }
}

function solveMaze(): SolveResult {
    const rows = Array.from(document.querySelectorAll(".maze-row"));
    const cells = rows.map((row) =>
        Array.from(row.querySelectorAll<HTMLInputElement>(".maze-cell"))
    );

    clearSolutionPath();

    const grid = cells.map((row) => row.map((cell) => cell.checked));
    const getNumber = (id: string) => Number((document.getElementById(id) as HTMLInputElement | null)?.value);
    const start: Point = [getNumber("StartY") - 1, getNumber("StartX") - 1];
    const end: Point = [getNumber("EndY") - 1, getNumber("EndX") - 1];

    if (
        grid.length === 0 ||
        start.some((value) => !Number.isFinite(value)) ||
        end.some((value) => !Number.isFinite(value)) ||
        grid[start[0]]?.[start[1]] !== false ||
        grid[end[0]]?.[end[1]] !== false
    ) {
        return {
            solved: false,
            message: "Could not solve: choose open start and exit positions.",
        };
    }

    const path = findShortestPath(grid, start, end);
    if (!path) {
        return {
            solved: false,
            message: "Could not solve: no path connects the start and exit.",
        };
    }

    for (const [row, col] of path.slice(1, -1)) {
        const cell = cells[row]?.[col];
        if (cell) {
            cell.classList.add("maze-cell--path");
            cell.dataset.solutionPath = "true";
        }
    }

    return {
        solved: true,
        message: `Maze solved in ${path.length} steps, including the start and exit positions.`,
    };
}

function findShortestPath(grid: boolean[][], start: Point, end: Point): Point[] | null {
    const rowCount = grid.length;
    const columnCount = grid[0]?.length ?? 0;
    if (
        rowCount === 0 ||
        columnCount === 0 ||
        grid.some((row) => row.length !== columnCount) ||
        start.some((value, axis) => !Number.isInteger(value) || value < 0 || value >= (axis === 0 ? rowCount : columnCount)) ||
        end.some((value, axis) => !Number.isInteger(value) || value < 0 || value >= (axis === 0 ? rowCount : columnCount)) ||
        grid[start[0]][start[1]] ||
        grid[end[0]][end[1]]
    ) {
        return null;
    }

    const queue: Point[] = [start];
    const visited = Array.from({ length: rowCount }, () => Array<boolean>(columnCount).fill(false));
    const previous: (Point | null)[][] = Array.from(
        { length: rowCount },
        () => Array<Point | null>(columnCount).fill(null)
    );
    visited[start[0]][start[1]] = true;

    for (let head = 0; head < queue.length; head++) {
        const [row, column] = queue[head];
        if (row === end[0] && column === end[1]) {
            const path: Point[] = [];
            let point: Point | null = end;
            while (point) {
                path.push(point);
                if (point[0] === start[0] && point[1] === start[1]) break;
                point = previous[point[0]][point[1]];
            }
            return path.reverse();
        }

        const neighbors: Point[] = [
            [row - 1, column],
            [row + 1, column],
            [row, column - 1],
            [row, column + 1],
        ];
        for (const [nextRow, nextColumn] of neighbors) {
            if (
                nextRow >= 0 &&
                nextRow < rowCount &&
                nextColumn >= 0 &&
                nextColumn < columnCount &&
                !grid[nextRow][nextColumn] &&
                !visited[nextRow][nextColumn]
            ) {
                visited[nextRow][nextColumn] = true;
                previous[nextRow][nextColumn] = [row, column];
                queue.push([nextRow, nextColumn]);
            }
        }
    }

    return null;
}

export default Maze;
