<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import TopBar from './TopBar.vue';
    import SideBar from './SideBar.vue';

    const props = defineProps({
        active: { type: String, default: '' } // current active route or section
    });

    const sidebarOpen = ref(true);

    const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value; };
</script>

<template>
    <div class="layout-root">
        <TopBar @toggle-sidebar="toggleSidebar">
            <template #right>
                <!-- Put user menu / logout button here if you want -->
                <slot name="topbar-right"></slot>
                <slot name="user-right"></slot>
            </template>
        </TopBar>

        <div class="layout-body">
            <transition name="slide">
                <SideBar v-if="sidebarOpen" class="sidebar-panel" :active="active" />
            </transition>

            <main class="content">
                <slot />
                <h1>Hi</h1>
            </main>
        </div>
    </div>
</template>

<style scoped>
    .layout-root {
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: #0a0e12;
    }
    .layout-body {
        flex: 1;
        display: grid;
        grid-template-columns: auto 1fr;
        min-height: 0; /* important for overflow */
    }
    .sidebar-panel {
        min-width: 100px;
    }
    .content {
        min-width: 0;
        padding: 16px;
        background: #0a0e12;
        color: #e5e7eb;
        overflow: auto;
    }

    /* slide transition for sidebar */
    .slide-enter-active, .slide-leave-active { transition: transform 150ms ease, opacity 150ms ease; }
    .slide-enter-from, .slide-leave-to { transform: translateX(-12px); opacity: 0; }
</style>