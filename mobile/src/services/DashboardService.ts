import {api} from "../config/clinet";
import {Dashboard} from "../api/types";

export async function getDashboard(): Promise<Dashboard> {
    const { data }= await api.get<Dashboard>(`/dashboard`);
    return data;
}