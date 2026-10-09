import { useEffect, useState } from "react";
import { useFetch } from "../../../shared/hooks/useFetch";
import type { ProductSummary, StockStatus } from "../../../shared/api/types";
import { getProducts } from "../api";

export function useProductList() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<StockStatus | null>(null);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState<ProductSummary[]>([]);

    const { data, loading, error } = useFetch(
        () => getProducts({ search: search || undefined, status: status ?? undefined, page }),
        [search, status, page],
    );


    useEffect(() => {
        if (!data) return;
        const content: ProductSummary[] = data.content ?? [];

        setProducts((previous: ProductSummary[]) => {
            if (data.number === 0) return content;
            const ids = new Set(previous.map((product) => product.id));
            return [...previous, ...content.filter((product) => !ids.has(product.id))];
        });
    }, [data]);

    function searchFor(text: string): void {
        setStatus(null);
        setSearch(text.trim());
        setPage(0);
    }

    function filterBy(newStatus: StockStatus | null): void {
        setStatus(newStatus);
        setPage(0);
    }

    function loadMore(): void {
        setPage((current) => current + 1);
    }

    return {
        products,
        status,
        loading,
        error,
        hasMore: data ? !data.last : false,
        searchFor,
        filterBy,
        loadMore,
    };
}