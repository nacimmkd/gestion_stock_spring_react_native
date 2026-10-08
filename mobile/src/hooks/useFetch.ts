import { useEffect, useState } from "react";

type FetchState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(fun: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);

        fun()
            .then((result) => {
                if (!cancelled) setData(result);
            })
            .catch((e) => {
                if (!cancelled) setError(e.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, deps);

    return { data, loading, error };
}