import axios from 'axios';

const api_url = 'http://10.27.112.66:8080/api/v1'

export const api = axios.create({
    baseURL: api_url,
    timeout: 5000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;

        const isNetworkError = !error.response;
        const isValidationError = status === 400;
        const isServerError = status >= 500;

        if (isNetworkError) {
            error.message = "Impossible de joindre le serveur. Vérifie ta connexion.";
        } else if (backendMessage) {
            error.message = backendMessage;
        } else if (isValidationError) {
            error.message = "Certains champs sont invalides.";
        } else if (isServerError) {
            error.message = "Le serveur a rencontré un problème. Réessaie plus tard.";
        } else {
            error.message = "Une erreur est survenue.";
        }

        return Promise.reject(error);
    }
);