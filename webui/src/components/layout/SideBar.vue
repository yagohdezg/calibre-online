<script setup>
    defineProps({
        active: { type: String, default: '' }
    });

    const emit = defineEmits(['update:active', 'select']);

    function setActive(name) {
        emit('update:active', name); // supports v-model:active on parent
        emit('select', name); // optional extra event
    }
</script>


<template>
    <aside class="sidebar">
        <nav>
        <ul>
            <li><a href="#" :class="{ active: active === 'books' }">Books</a></li>
            <li><a href="#" :class="{ active: active === 'items' }">Items</a></li>
            <li><a href="#" @click.prevent="setActive('settings')" :class="{ active: active === 'settings' }">Settings</a></li>
        </ul>
        </nav>
    </aside>
</template>


<style scoped>
    .sidebar {
        width: 260px;
        height: 100%;
        background: #0b0f13;
        color: #cbd5e1;
        border-right: 1px solid #222a33;
        padding: 12px;
        box-sizing: border-box;
        overflow-y: auto;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    a {
        display: block;
        padding: 10px 12px;
        border-radius: 8px;
        color: inherit;
        text-decoration: none;
    }
    a:hover {
        background: #11171e;
    }
    a.active {
        background: #1a2230;
        color: #fff;
        font-weight: 600;
    }
</style>