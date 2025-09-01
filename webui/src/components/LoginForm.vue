<script setup>
    import { ref } from "vue";
    import { useAuth } from "@/stores/auth";

    const auth = useAuth();
    const username = ref("");
    const password = ref("");

    function formatError(err) {
        if (typeof err === "string") return err;
        if (err?.detail) return err.detail;
        // DRF serializer errors object -> show first message
        const firstKey = err && Object.keys(err)[0];
        if (firstKey && Array.isArray(err[firstKey])) return err[firstKey][0];
        try { 
            return JSON.stringify(err);
        } catch {
            return "Login failed";
        }
    }

    async function onSubmit() {
        await auth.login(username.value, password.value);
    }
</script>

<template>
    <form class="login" @submit.prevent="onSubmit">
        <h2>Login</h2>
        <label>
            Username
            <input v-model.trim="username" autocomplete="username" required />
        </label>

        <label>
            Password
            <input v-model="password" type="password" autocomplete="current-password" required />
        </label>

        <button :disabled="auth.state.loading">
            {{ auth.state.loading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="auth.state.error" class="error">
            {{ formatError(auth.state.error) }}
        </p>
    </form>
</template>

<style scoped>
    .login {
        max-width: 360px;
        margin: 4rem auto;
        display: grid;
        gap: 0.75rem;
    }
    label {
        display: grid;
        gap: 0.25rem;
    }
    input {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    button {
        padding: 0.6rem 0.8rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .error {
        color: #b00020;
    }
</style>
