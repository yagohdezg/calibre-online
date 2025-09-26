<template>
    <header class="topbar">
        <button class="icon-btn" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">
            ☰
        </button>
        <h1 class="title">
            Calibre Online
        </h1>
        <div class="spacer"></div>
            <slot name="right">
            <!-- Right-side actions (user menu, notifications, etc.) -->
        </slot>
    </header>
</template>

<style scoped>
    .topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        height: 56px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        background: #101418;
        color: #fff;
        border-bottom: 1px solid #222a33;
    }
    .icon-btn {
        background: transparent;
        border: none;
        font-size: 20px;
        color: inherit;
        cursor: pointer;
    }
    .title {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
    }
    .spacer {
        flex: 1;
    }
</style>