<script setup>
    import { useAuth } from "@/stores/auth"; // or wherever your auth is defined
    import AppLayout from "@/components/layout/AppLayout.vue";
    import userIcon from '@/assets/user.svg'   // Vite resolves this to the correct URL

    const auth = useAuth();
</script>

<template>
    <AppLayout active="books">
        <template #topbar-right>
            <button class="logout" @click="auth.logout">Logout</button>
        </template>
        <template #user-right>
            <button class="user">
                <img
                :src="userIcon"
                    alt=""
                class="w-6 h-6"
                aria-hidden="true"
                />
            </button>
        </template>
    </AppLayout>
</template>

<style scoped>
    button {
        background-color: rgb(60, 63, 63);
    }
</style>
