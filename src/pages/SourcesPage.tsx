import { useEffect, useState } from "react";
import mazeSourceUrl from "../examples/Maze-Solver/maze.dfy";
import queueSourceUrl from "../examples/Maze-Solver/Queue.dfy";
import Source, { type SourceProject } from "./Source";

const sourceProjects = [
    {
        id: "maze",
        label: "Maze Solver",
        files: [
            { label: "maze.dfy", url: mazeSourceUrl },
            { label: "Queue.dfy", url: queueSourceUrl },
        ],
    },
];

export default function SourcesPage() {
    const [projects, setProjects] = useState<SourceProject[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadSources = async () => {
            try {
                const loadedProjects = await Promise.all(
                    sourceProjects.map(async (project) => ({
                        ...project,
                        files: await Promise.all(
                            project.files.map(async ({ label, url }) => {
                                const response = await fetch(url);
                                if (!response.ok) {
                                    throw new Error(
                                        `Failed to load ${label}: ${response.status} ${response.statusText}`,
                                    );
                                }
                                return { label, sourceCode: await response.text() };
                            }),
                        ),
                    })),
                );

                if (!cancelled) setProjects(loadedProjects);
            } catch (loadError) {
                if (!cancelled) {
                    setError(
                        loadError instanceof Error ? loadError.message : String(loadError)
                    );
                }
            }
        };

        void loadSources();
        return () => {
            cancelled = true;
        };
    }, []);

    if (error) {
        return <p role="alert">Could not load source files: {error}</p>;
    }
    if (projects.length === 0) {
        return <p role="status">Loading source files…</p>;
    }

    return <Source projects={projects} />;
}
