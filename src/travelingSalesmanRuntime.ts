import BigNumber from "bignumber.js";

export type CompiledTravelingSalesman = {
    graph: any;
    dafny: any;
    module: any;
    check(tour: number[]): [boolean, any];
};

export async function loadTravelingSalesman(
    sourceUrl: string,
): Promise<CompiledTravelingSalesman> {
    const response = await fetch(sourceUrl);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const source = (await response.text())
        .replace("const BigNumber = require('bignumber.js');", "BigNumber = arguments[0];")
        .replace(/_dafny\.HandleHaltExceptions\([\s\S]*$/, "");

    const createModule = new Function(
        "BigNumber",
        `${source}
        const graph = _module.Graph.create_Graph(
            new BigNumber(4),
            _dafny.Seq.of(
                _dafny.Seq.of(_dafny.ZERO, new BigNumber(12), new BigNumber(8), new BigNumber(5)),
                _dafny.Seq.of(new BigNumber(8), new BigNumber(9), new BigNumber(7), new BigNumber(2)),
                _dafny.Seq.of(_dafny.ZERO, new BigNumber(2), new BigNumber(6), new BigNumber(10)),
                _dafny.Seq.of(_dafny.ONE, new BigNumber(2), _dafny.ONE, new BigNumber(8))
            )
        );
        return { dafny: _dafny, graph, module: _module };`,
    ) as (bigNumber: typeof BigNumber) => CompiledTravelingSalesman;

    const runtime = createModule(BigNumber);
    runtime.graph.dtor_cost.forEach((row: unknown[], city: number) => {
        row[city] = undefined;
    });
    runtime.check = (tour: number[]) => {
        const dafnyTour = runtime.dafny.Seq.of(
            ...tour.map((city) => new BigNumber(city)),
        );
        return runtime.module.__default.CheckCandidateTour(
            runtime.graph,
            dafnyTour,
        );
    };
    return runtime;
}
