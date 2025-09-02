<script setup>
    import { ref } from 'vue';
    import { useAuth }  from '@/stores/auth';

    const auth = useAuth();
    const username = ref('');
    const password = ref('');

    async function onSubmit() {
        await auth.login(username.value, password.value);
    }

</script>

<template>
    <form class="login" @submit.prevent="onSubmit">
        <h2>Login</h2>
        <label>
            Username:
            <input type="text" name="username" v-model="username" required/>
        </label>
        <label>
            Password:
            <input type="password" name="password" v-model="password" required/>
        </label>
        <button type="submit">Login</button>
    </form>>
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
        padding: 0.5rem;
        border: none;
        border-radius: 8px;
        background-color: #42b983;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
</style>