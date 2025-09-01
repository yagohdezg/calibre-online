import { reactive, computed } from "vue";
import { api, setTokens, clearTokens, getTokens } from "@/api/client";

const state = reactive({
    access: getTokens()?.access || null,
    refresh: getTokens()?.refresh || null,
    loading: false,
    error: null,
});

const isAuthenticated = computed(() => Boolean(state.access));

async function login(username, password) {
    state.loading = true;
    state.error = null;
    try {
        const url = new URL(import.meta.env.VITE_LOGIN_PATH, import.meta.env.VITE_API_BASE_URL).toString();
        const { data } = await api.post(url, { username, password });

        // Expecting { access, refresh }
        if (!data?.access || !data?.refresh) {
            throw new Error("Login response missing tokens.");
        }
        
        setTokens({ access: data.access, refresh: data.refresh });
        state.access = data.access;
        state.refresh = data.refresh;
        return true;

    } catch (e) {
        state.error = e?.response?.data || e.message || "Login failed";
        clearTokens();
        state.access = null;
        state.refresh = null;
        return false;

    } finally {
        state.loading = false;
    }
}

function logout() {
    clearTokens();
    state.access = null;
    state.refresh = null;
    state.user = null;
}

export function useAuth() {
    return { state, isAuthenticated, login, logout };
}
