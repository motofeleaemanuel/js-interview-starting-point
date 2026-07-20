import { API_BASE_URL } from "./config.js";

const TOKEN_API_URL = `${API_BASE_URL}/tokens`

async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (response.ok || response.status < 500) {
                return response;
            }

            if (attempt === maxRetries) return response;
        } catch (error) {
            if (attempt === maxRetries) throw error;
        }

        const delay = 500 * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

async function fetchNewToken() {
    const response = await fetchWithRetry(TOKEN_API_URL, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('We could not retrieve the token.');
    }

    const data = await response.json();
    return data.token;
}

export async function apiFetch(url, options = {}) {
    const token = await fetchNewToken();
    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetchWithRetry(`${url}?token=${token}`, {
        ...options,
        headers
    });

    return response;
}