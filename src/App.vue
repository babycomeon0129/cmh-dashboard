<template>
    <div class="dashboard">
        <SideBar />
        <router-view v-slot="{ Component }">
            <transition
                name="slide-fade"
                mode="out-in"
            >
                <main :key="route.name">
                    <component :is="Component" />
                </main>
            </transition>
        </router-view>

    </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import SideBar from "@/components/SideBar.vue";
const route = useRoute();
</script>

<style lang="scss" scoped>
main {
	display: flex;
	flex-direction: column;
	width: calc(100% - var(--side-width));
	height: 100vh;
	margin-left: var(--side-width);
	padding: 15px;
}

.dashboard {
    display: flex;
}
</style>
