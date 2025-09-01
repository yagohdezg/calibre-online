<script setup>
    import { watch } from "vue";
    import LoginForm from "@/components/LoginForm.vue";
    import { useAuth } from "@/stores/auth";

    const auth = useAuth();
</script>

<template>
    <main>
        <LoginForm v-if="!auth.isAuthenticated.value" />
        <section v-else class="authed">
            <h2>You're logged in ✅</h2>
            <h3>{{ auth.isAuthenticated }}</h3>
            <div class="actions">
                <button @click="auth.logout">Logout</button>
            </div>
        </section>
    </main>
</template>

<style scoped>
    main {
        padding: 2rem;
    }
    .authed {
        max-width: 720px;
        margin: 2rem auto;
    }
    .actions {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    pre {
        background: #f7f7f7;
        padding: 1rem;
        border-radius: 8px;
        overflow: auto;
    }
</style>
