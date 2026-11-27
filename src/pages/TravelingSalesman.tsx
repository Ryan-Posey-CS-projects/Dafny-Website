import { useEffect, useMemo, useRef, useState } from "react";
import tspRuntimeUrl from "../examples/intermediate/RudimentaryTravelingSalesman.js";
import {
    loadTravelingSalesman,
    type CompiledTravelingSalesman,
} from "../travelingSalesmanRuntime";

type Selection = {
    id: string;
    label: string;
    tour: number[];
    note?: string;
};

type PresetTour = {
    id: string;
    label: string;
    tour: number[];
    note: string;
};

const CITY_COUNT = 4;
const COST_MATRIX: (number | null)[][] = [
    [null, 12, 8, 5],
    [8, null, 7, 2],
    [0, 2, null, 10],
    [1, 2, 1, null],
];
const COST_EDGES = COST_MATRIX.flatMap((row, from) =>
    row.flatMap((cost, to) => (cost === null ? [] : [{ from, to, cost }])),
);
const PRESET_TOURS: PresetTour[] = [
    { id: "tour0", label: "tour0", tour: [0, 1, 2, 3], note: "Example tour 1" },
    { id: "tour1", label: "tour1", tour: [0, 1, 3, 2], note: "Example tour 2" },
    { id: "tourInvalid", label: "tourInvalid", tour: [0, 1, 2, 2], note: "Deliberately visits city 2 twice" },
];

type TourCheck =
    | { ok: false; rules: { passed: boolean; text: string }[]; reason: string }
    | {
        ok: true;
        rules: { passed: boolean; text: string }[];
        reason: string;
        totalCost: number;
        hops: { from: number; to: number; cost: number; running: number }[];
    };

function checkCandidateTour(
    tour: number[],
    runtime: CompiledTravelingSalesman,
): TourCheck {
    const [valid, compiledTotalCost] = runtime.check(tour);
    const lengthRule = tour.length === CITY_COUNT;
    const rangeRule = tour.every((city) => city >= 0 && city < CITY_COUNT);
    const seen = new Set<number>();
    let repeatedCity: number | undefined;
    for (const city of tour) {
        if (seen.has(city)) {
            repeatedCity = city;
            break;
        }
        seen.add(city);
    }
    const distinctRule = repeatedCity === undefined;
    const rules = [
        { passed: lengthRule, text: `The tour includes exactly ${CITY_COUNT} cities` },
        { passed: rangeRule, text: `Every city number is between 0 and ${CITY_COUNT - 1}` },
        {
            passed: distinctRule,
            text: distinctRule
                ? "No city is visited more than once"
                : `City ${repeatedCity} is visited more than once`,
        },
    ];

    if (!lengthRule) {
        return {
            ok: false,
            rules,
            reason: `This tour has ${tour.length} stops; it must include all ${CITY_COUNT} cities.`,
        };
    }
    if (!rangeRule || !distinctRule || !valid) {
        return {
            ok: false,
            rules,
            reason: "A valid trip visits each city once and returns to its starting city.",
        };
    }

    const hops: { from: number; to: number; cost: number; running: number }[] = [];
    let running = 0;
    tour.forEach((from, index) => {
        const to = index + 1 < tour.length ? tour[index + 1] : tour[0];
        const cost = COST_MATRIX[from][to];
        if (cost === null) {
            throw new Error(`The route contains a self-loop at city ${from}.`);
        }
        running += cost;
        hops.push({ from, to, cost, running });
    });
    return {
        ok: true,
        rules,
        reason: "This trip visits each city once and returns to its starting city.",
        totalCost: compiledTotalCost.toNumber(),
        hops,
    };
}

function allTours(): number[][] {
    const rest = Array.from({ length: CITY_COUNT - 1 }, (_, index) => index + 1);
    const tours: number[][] = [];
    const permute = (current: number[], remaining: number[]) => {
        if (remaining.length === 0) {
            tours.push([0, ...current]);
            return;
        }
        remaining.forEach((city, index) => {
            permute(
                [...current, city],
                [...remaining.slice(0, index), ...remaining.slice(index + 1)],
            );
        });
    };
    permute([], rest);
    return tours;
}

// --- SVG layout -----------------------------------------------------------

type Point = { x: number; y: number };

const CITY_POSITIONS: Point[] = [
    { x: 95, y: 75 },
    { x: 385, y: 115 },
    { x: 355, y: 305 },
    { x: 110, y: 300 },
];

const NODE_RADIUS = 26;

/** A quadratic arc from one city to another, bulging sideways by `curve`. */
function arcGeometry(from: Point, to: Point, curve: number) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;

    const startX = from.x + ux * (NODE_RADIUS + 4);
    const startY = from.y + uy * (NODE_RADIUS + 4);
    const endX = to.x - ux * (NODE_RADIUS + 9);
    const endY = to.y - uy * (NODE_RADIUS + 9);

    const controlX = (startX + endX) / 2 - uy * curve;
    const controlY = (startY + endY) / 2 + ux * curve;

    return {
        d: `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
        mid: {
            x: 0.25 * startX + 0.5 * controlX + 0.25 * endX,
            y: 0.25 * startY + 0.5 * controlY + 0.25 * endY,
        },
    };
}

function activeEdgeKey(from: number, to: number) {
    return `${from}->${to}`;
}

function EdgeLayer({
    activeEdges
}: {
    activeEdges: { from: number; to: number; cost: number }[];
}) {
    return (
        <g>
            {activeEdges.map((edge) => {
                const from = CITY_POSITIONS[edge.from];
                const to = CITY_POSITIONS[edge.to];
                const geometry = arcGeometry(from, to, 26);
                return (
                    <g key={`active-${activeEdgeKey(edge.from, edge.to)}`}>
                        <path
                            d={geometry.d}
                            fill="none"
                            stroke="#0d6efd"
                            strokeWidth={3.5}
                            markerEnd="url(#tsp-arrow-active)"
                        />
                        <text
                            x={geometry.mid.x}
                            y={geometry.mid.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={14}
                            fontWeight={700}
                            fill="#0d6efd"
                            stroke="#fff"
                            strokeWidth={4}
                            paintOrder="stroke"
                        >
                            {edge.cost}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}
let newView = true;
function TravelingSalesmanView({ runtime }: { runtime: CompiledTravelingSalesman }) {
    const cityCount = CITY_COUNT;
    const presetTours = PRESET_TOURS;
    const graphAreaRef = useRef<HTMLElement | null>(null);
    const [graphAreaHeight, setGraphAreaHeight] = useState(0);
    const [selection, setSelection] = useState<Selection>({
        id: "tour0",
        label: "tour0",
        tour: presetTours[0].tour,
        note: presetTours[0].note,
    });
    const [defaultSelection, setDefaultSelection] = useState<Selection>({
        id: "tour0",
        label: "tour0",
        tour: presetTours[0].tour,
        note: presetTours[0].note,
    });
    useEffect(() => {
        const graphArea = graphAreaRef.current;
        if (!graphArea) return;

        const desktopLayout = window.matchMedia("(min-width: 992px)");
        const updateHeight = () => {
            setGraphAreaHeight(
                desktopLayout.matches ? graphArea.getBoundingClientRect().height : 0,
            );
        };
        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(graphArea);
        desktopLayout.addEventListener("change", updateHeight);
        return () => {
            observer.disconnect();
            desktopLayout.removeEventListener("change", updateHeight);
        };
    }, []);

    const check = useMemo(() => checkCandidateTour(selection.tour, runtime), [runtime, selection.tour]);
    const searched = useMemo(
        () =>
            allTours()
                .map((tour) => ({ tour, result: checkCandidateTour(tour, runtime) }))
                .filter(
                    (
                        entry,
                    ): entry is {
                        tour: number[];
                        result: Extract<TourCheck, { ok: true }>;
                    } => entry.result.ok,
                )
                .sort((a, b) => a.result.totalCost - b.result.totalCost),
        [runtime],
    );
    if (newView !== false) {
        presetTours.push({ ...searched[0], id: 'best', note: 'Best found tour', label: 'Best Found Tour' });
        newView = false;
    }
    const activeEdges = useMemo(() => {
        const edges: { from: number; to: number; cost: number }[] = [];
        selection.tour.forEach((from, index) => {
            const to = index + 1 < selection.tour.length ? selection.tour[index + 1] : selection.tour[0];
            const cost = COST_MATRIX[from]?.[to];
            if (from !== to && cost !== undefined && cost !== null) {
                edges.push({ from, to, cost });
            }
        });
        return edges;
    }, [selection.tour]);

    const choosePreset = (preset: PresetTour) => {
        const nextSelection = {
            id: preset.id,
            label: preset.label,
            tour: preset.tour,
            note: preset.note,
        };
        setDefaultSelection(nextSelection);
        setSelection(nextSelection);
    };

    const chooseCustomRoute = () => {
        const nextSelection = {
            id: "custom",
            label: "your tour",
            tour: selection.id === "custom" ? selection.tour : [],
            note: "Built by clicking cities",
        };
        setDefaultSelection(nextSelection);
        setSelection(nextSelection);
    };

    const resetRoute = () =>
        setSelection({
            ...defaultSelection,
            tour: [...defaultSelection.tour],
        });

    const appendCity = (city: number) => {
        if (selection.id !== "custom") {
            setSelection({ id: "custom", label: "your tour", tour: [city], note: "Built by clicking cities" });
            return;
        }
        if (selection.tour.includes(city)) return;
        if (selection.tour.length >= cityCount + 2) return;
        setSelection({
            id: "custom",
            label: "your tour",
            tour: [...selection.tour, city],
            note: "Built by clicking cities",
        });
    };
    const customActive = selection.id === "custom";

    return (
        <div className="card">
            <div className="card-body text-start">
                <header className="mb-4 text-center">
                    <p className="text-primary fw-semibold text-uppercase mb-2">
                        Intermediate example
                    </p>
                    <h1 className="display-6 fw-bold">The Traveling Salesman</h1>
                    <p className="lead mx-auto mb-0 hero-text">
                        Choose a tour to see whether it visits each city once and compare its total travel cost.
                    </p>
                </header>

                <div className="row g-3 align-items-start">
                    <div className="col-lg-7">
                        <section ref={graphAreaRef} className="card h-100" aria-labelledby="tsp-graph-title">
                            <div className="card-body">
                                <h2 className="h5 card-title" id="tsp-graph-title">
                                    The graph
                                </h2>
                                <p className="text-body-secondary small">
                                    Four cities, numbered 0–3. Costs are
                                    directed — the arc from 0 to 2 costs 8, while the arc
                                    back from 2 to 0 costs 0.
                                </p>
                                <svg
                                    viewBox="0 0 480 380"
                                    className="w-100"
                                    role="img"
                                    aria-label="Directed graph of four cities with the selected tour highlighted"
                                >
                                    <defs>
                                        <marker
                                            id="tsp-arrow-faint"
                                            viewBox="0 0 10 10"
                                            refX="9"
                                            refY="5"
                                            markerWidth="6"
                                            markerHeight="6"
                                            orient="auto-start-reverse"
                                        >
                                            <path d="M0,0 L10,5 L0,10 z" fill="#adb5bd" />
                                        </marker>
                                        <marker
                                            id="tsp-arrow-active"
                                            viewBox="0 0 10 10"
                                            refX="9"
                                            refY="5"
                                            markerWidth="6"
                                            markerHeight="6"
                                            orient="auto-start-reverse"
                                        >
                                            <path d="M0,0 L10,5 L0,10 z" fill="#0d6efd" />
                                        </marker>
                                    </defs>
                                    <EdgeLayer activeEdges={activeEdges} />
                                    {CITY_POSITIONS.map((city, index) => {
                                        const inTour = selection.tour.includes(index);
                                        return (
                                            <g
                                                key={`city-${index}`}
                                                onClick={() => appendCity(index)}
                                                style={customActive ? { cursor: "pointer" } : undefined}
                                            >
                                                <circle
                                                    cx={city.x}
                                                    cy={city.y}
                                                    r={NODE_RADIUS}
                                                    fill={inTour ? "#0d6efd" : "#fff"}
                                                    stroke={inTour ? "#0d6efd" : "#adb5bd"}
                                                    strokeWidth={2.5}
                                                />
                                                <text
                                                    x={city.x}
                                                    y={city.y}
                                                    textAnchor="middle"
                                                    dominantBaseline="central"
                                                    fontSize={22}
                                                    fontWeight={700}
                                                    fill={inTour ? "#fff" : "#212529"}
                                                >
                                                    {index}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>
                                <p className="small text-body-secondary mb-0">
                                    {customActive
                                        ? "Click a city to add it to your tour. Click a preset below to go back."
                                        : "Switch to \"your tour\" below and click cities to build one."}
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="col-lg-5">

                        <section
                            className="card"
                            aria-labelledby="tsp-check-title"
                            style={{ height: graphAreaHeight > 0 ? graphAreaHeight / 2 : undefined }}
                        >
                            <div className="card-body d-flex flex-column overflow-hidden">
                                <h2 className="h5 card-title">Cost table</h2>
                                <div
                                    className="table-responsive flex-grow-1"
                                    style={{ minHeight: 0, overflowY: "auto" }}
                                >
                                    <table className="table table-sm table-striped align-middle mb-0">
                                        <caption className="visually-hidden">
                                            Travel cost between each pair of distinct cities
                                        </caption>
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">From</th>
                                                <th scope="col">To</th>
                                                <th scope="col">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {COST_EDGES.map((edge) => (
                                                <tr key={`${edge.from}-${edge.to}`}>
                                                    <td>{edge.from}</td>
                                                    <td>{edge.to}</td>
                                                    <td>{edge.cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                        <section className="card" aria-labelledby="tsp-check-title" style={{ height: graphAreaHeight > 0 ? graphAreaHeight / 2 : undefined }}>
                            <div className="card-body d-flex flex-column overflow-hidden">
                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-0">
                                    <h2 className="h5 card-title mb-0" id="tsp-check-title">
                                        Route check: {selection.label}
                                    </h2>
                                    <span
                                        className={`badge ${check.ok ? "text-bg-success" : "text-bg-danger"}`}
                                    >
                                        {check.ok ? "valid" : "invalid"}
                                    </span>
                                </div>
                                {selection.note ? (
                                    <p className="small text-body-secondary mb-3">
                                        {selection.note}
                                    </p>
                                ) : null}

                                <ul className="list-unstyled mb-3">
                                    {check.rules.map((rule) => (
                                        <li className="mb-1" key={rule.text}>
                                            <span
                                                aria-hidden="true"
                                                className={check.ok || rule.passed ? "text-success" : "text-danger"}
                                            >
                                                {rule.passed ? "✓ " : "✗ "}
                                            </span>
                                            {rule.text}
                                        </li>
                                    ))}
                                </ul>

                                <p className="small mb-3">{check.reason}</p>

                                {check.ok ? (
                                    <>
                                        <p className="mb-0">
                                            <strong>Total cost: {check.totalCost}</strong>{" "}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </section>
                    </div>
                </div>

                <section className="mt-3 rounded border p-4" aria-labelledby="tsp-choose-title">
                    <h2 className="h5" id="tsp-choose-title">
                        Choose a tour
                    </h2>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        {presetTours.map((preset) => (
                            <button
                                key={preset.id}
                                type="button"
                                className={`btn btn-sm ${selection.id === preset.id ? "btn-primary" : "btn-outline-primary"
                                    }`}
                                onClick={() => choosePreset(preset)}
                            >
                                {preset.label}: [{preset.tour.join(", ")}]
                            </button>
                        ))}

                        <button
                            type="button"
                            className={`btn btn-sm ${customActive ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={chooseCustomRoute}
                        >
                            Your tour
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={resetRoute}
                        >
                            Reset tour
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

function TravelingSalesman() {
    const [runtime, setRuntime] = useState<CompiledTravelingSalesman>();
    const [runtimeError, setRuntimeError] = useState<string>();

    useEffect(() => {
        let active = true;
        void loadTravelingSalesman(tspRuntimeUrl)
            .then((loadedRuntime) => {
                if (active) setRuntime(loadedRuntime);
            })
            .catch((error) => {
                if (active) {
                    setRuntimeError(error instanceof Error ? error.message : String(error));
                }
            });
        return () => {
            active = false;
        };
    }, []);

    if (runtimeError) {
        return (
            <div className="card">
                <div className="card-body">
                    <p className="text-danger mb-0" role="alert">
                        Could not load RudimentaryTravelingSalesman.js: {runtimeError}
                    </p>
                </div>
            </div>
        );
    }
    if (!runtime) {
        return (
            <div className="card">
                <div className="card-body">
                    <p className="text-body-secondary mb-0" role="status">
                        Loading RudimentaryTravelingSalesman.js...
                    </p>
                </div>
            </div>
        );
    }
    return <TravelingSalesmanView runtime={runtime} />;
}

export default TravelingSalesman;
