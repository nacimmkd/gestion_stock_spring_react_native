import { Category } from "../../shared/api/types";
import { api } from "../../shared/api/client";

export async function getCategory(): Promise<Category[]> {
    const { data } = await api.get(`/categories`);
    return data;
}