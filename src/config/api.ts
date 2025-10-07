export const API_BASE_URL = "http://localhost:3001";

export const apiUrl = (path: string): string => {
    if (!path) return API_BASE_URL;
    return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
};


