const isProd = typeof window !== 'undefined' && window.location.hostname === 'gurukulbakery.com';
export const API_BASE_URL = isProd ? "/api" : "http://localhost:3001/api";

export const apiUrl = (path: string): string => {
    if (!path) return API_BASE_URL;
    return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
};


