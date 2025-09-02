import { reactive, computed } from "vue";
import { api, setTokens, getTokens, clearTokens } from "@/api/client";


const state = reactive({
    access: getTokens()?.access || null,
    refresh: getTokens()?.refresh || null,
    loading: false,
    error: null
})

const isAuthenticated = computed(() => Boolean(state.access));

async function login(username, password) {
    state.loading = true
    state.error = null

    console.log(state.access)
    console.log(isAuthenticated.value)

    try {
        const url = new URL(import.meta.env.VITE_LOGIN_PATH, import.meta.env.VITE_API_BASE_URL).toString();
        const { data } = await api.post(url, { username, password })
        setTokens({ access: data.access, refresh: data.refresh })
        state.access = data.access
        state.refresh = data.refresh
        return true

    } catch (e) {
        state.error = e
        clearTokens()

        return false;

    } finally {
        state.loading = false
    }
}

function logout() {
    clearTokens()
    state.access = null
    state.refresh = null
}

export function useAuth() {
    return { state, isAuthenticated, login, logout}
}
