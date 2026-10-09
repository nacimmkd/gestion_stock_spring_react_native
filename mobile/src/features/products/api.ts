import {api} from "../../shared/api/client";
import {
    ProductCreateRequest,
    ProductDetails,
    ProductPage,
    ProductUpdateRequest,
    ProductFilters,
    StockMovement, PagedProduct, StockCount
} from "../../shared/api/types";


export async function getProducts(filters: ProductFilters = {}):Promise<PagedProduct> {
    const { data } = await api.get<ProductPage>("/products", { params: filters });
    return data;
}

export async function getProduct(id: string): Promise<ProductDetails> {
    const { data } = await api.get<ProductDetails>(`/products/${id}`);
    return data;
}

export async function createProduct(request: ProductCreateRequest):  Promise<ProductDetails>  {
    const { data } = await api.post<ProductDetails>("/products", request);
    return data;
}

export async function updateProduct(id: string, request: ProductUpdateRequest):  Promise<ProductDetails>  {
    const { data } = await api.put<ProductDetails>(`/products/${id}`, request);
    return data;
}

export async function deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
}

export async function updateStock(
    id: string,
    request: { type: StockMovement; quantity: number }
): Promise<ProductDetails> {
    const { data } = await api.patch<ProductDetails>(`/products/${id}/stock`, request);
    return data;
}

export async function countOutOfStock(): Promise<number> {
    const { data } = await api.get<number>(`/products/out-of-stock/count`);
    return data;
}

export async function countsByStatus(): Promise<StockCount[]> {
    const { data } = await api.get<StockCount[]>(`/products/status-counts`);
    return data;
}