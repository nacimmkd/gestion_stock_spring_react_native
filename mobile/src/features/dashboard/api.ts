import {api} from "../../shared/api/client";
import {Dashboard} from "../../shared/api/types";

export async function getDashboard(): Promise<Dashboard> {
    const { data }= await api.get<Dashboard>(`/dashboard`);
    return data;
}