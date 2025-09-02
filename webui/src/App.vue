<script setup>
    import LoginForm from '@/components/LoginForm.vue'
    import { useAuth } from '@/stores/auth'

    const auth = useAuth()
</script>

<template>
    <main>
        <LoginForm v-if="!auth.isAuthenticated.value" />
        <section v-else>
            <h1>Welcome!</h1>
            <p>You are logged in.</p>
            <button @click="auth.logout">Logout</button>
        </section>
    </main>
</template>

<style scoped>
</style>
