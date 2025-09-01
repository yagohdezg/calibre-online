import axios from "axios";

// Basic token stash using localStorage
let isRefreshing = false;
let pendingQueue = [];

const tokenKey = "auth_tokens"; // { access, refresh }
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


function getTokens() {
  try { return JSON.parse(localStorage.getItem(tokenKey)) || null; }
  catch { return null; }
}


function setTokens(tokens) {
  localStorage.setItem(tokenKey, JSON.stringify(tokens));
}


function clearTokens() {
  localStorage.removeItem(tokenKey);
}


// Attach access token on every request
api.interceptors.request.use((config) => {
    const tokens = getTokens();
    if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
});


// Helper to process queued requests after refresh
function processQueue(error, newAccess) {
    pendingQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(newAccess);
    });
    pendingQueue = [];
}


// Auto-refresh on 401
api.interceptors.response.use(
    (res) => res, async (error) => {
        console.log("API response error:", error.config);
        const original = error.config;
        if (!original || original._retry) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            const tokens = getTokens();
            if (!tokens?.refresh) {
                clearTokens();
                return Promise.reject(error);
            }

            // Queue requests while a refresh is happening
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({
                        resolve: (newAccess) => {
                            original.headers.Authorization = `Bearer ${newAccess}`;
                            resolve(api(original));
                        },
                        reject,
                    });
                });
            }

            original._retry = true;
            isRefreshing = true;

            try {
                const refreshPath = import.meta.env.VITE_REFRESH_PATH || "/api/users/refresh";
                const { data } = await axios.post(
                    new URL(refreshPath, import.meta.env.VITE_API_BASE_URL).toString(),
                    { refresh: tokens.refresh },
                    { headers: { "Content-Type": "application/json" } }
                );

                // Support either {access} or {access, refresh} responses (rotate if provided)
                const newTokens = {
                    access: data.access,
                    refresh: data.refresh || tokens.refresh,
                };
                setTokens(newTokens);
                processQueue(null, newTokens.access);
                original.headers.Authorization = `Bearer ${newTokens.access}`;
                return api(original);

            } catch (e) {
                processQueue(e, null);
                clearTokens();
                return Promise.reject(e);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export { api, getTokens, setTokens, clearTokens };
