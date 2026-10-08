import {api} from "../config/clinet";
import {
    ProductCreateRequest,
    ProductDetails,
    ProductPage,
    ProductUpdateRequest,
    ProductFilters,
    StockMovement
} from "../api/types";


export async function getProducts(filters: ProductFilters = {}) {
    const { data } = await api.get<ProductPage>("/products", { params: filters });
    return data;
}

export async function getProduct(id: string) {
    const { data } = await api.get<ProductDetails>(`/products/${id}`);
    return data;
}

export async function createProduct(request: ProductCreateRequest) {
    const { data } = await api.post<ProductDetails>("/products", request);
    return data;
}

export async function updateProduct(id: string, request: ProductUpdateRequest) {
    const { data } = await api.put<ProductDetails>(`/products/${id}`, request);
    return data;
}

export async function deleteProduct(id: string) {
    await api.delete(`/products/${id}`);
}

export async function updateStock(
    id: string,
    request: { type: StockMovement; quantity: number }
) {
    const { data } = await api.patch<ProductDetails>(`/products/${id}/stock`, request);
    return data;
}