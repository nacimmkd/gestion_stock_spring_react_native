import axios, { type AxiosError } from "axios";

const API_URL: string = "http://10.27.112.66:8080/api/v1";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        error.message = toMessage(error);
        return Promise.reject(error);
    },
);


function toMessage(error: AxiosError<{ message?: string }>): string {
    if (!error.response) {
        return "Impossible de joindre le serveur. Vérifie ta connexion.";
    }

    const { status, data } = error.response;

    if (data?.message) return data.message;
    if (status === 400) return "Certains champs sont invalides.";
    if (status >= 500) return "Le serveur a rencontré un problème. Réessaie plus tard.";

    return "Une erreur est survenue.";
}