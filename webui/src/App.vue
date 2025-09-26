<script setup>
    import LoginForm from '@/components/LoginForm.vue'
    import MainWindow from '@/components/MainWindow.vue'
    import { useAuth } from '@/stores/auth'

    const auth = useAuth()
</script>

<template>
    <main>
        <LoginForm v-if="!auth.isAuthenticated.value" />
        <MainWindow v-else />
    </main>
</template>

<style scoped>
    main { min-height: 100vh; }
</style>
