import { Category } from "../api/types";
import { api } from "../config/clinet";

export async function getCategory(): Promise<Category[]> {
    const { data } = await api.get(`/categories`);
    return data;
}