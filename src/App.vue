<template>
    <div class="dashboard">
        <SideBar />
        <main>
            <RouterView />
        </main>

    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SideBar from "@/components/SideBar.vue";
</script>

<style lang="scss" scoped>
main {
	display: flex;
	flex-direction: column;
	width: calc(100% - var(--side-width));
	height: calc(100vh - 30px);
	margin-left: var(--side-width);
	padding: 15px;
}

.dashboard {
    display: flex;
}
</style>
