<template>
    <div class="dashboard">
        <SideBar />
        <router-view v-slot="{ Component }">
            <transition
                name="slide-fade"
                mode="out-in"
            >
                <main
                    ref="dashboard"
                    :key="route.name"
                    :class="{show: showSideBar}"
                >
                    <component :is="Component" />
                </main>
            </transition>
        </router-view>

    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import SideBar from "@/components/SideBar.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { useFullscreen } from "@/composable/useFullscreen.js";
const store = useDashboardStore();
const { showSideBar, openFullscreen } = storeToRefs(store);

const route = useRoute();
const dashboard = ref(null);
const { toggleFullscreen, exitFullscreen } = useFullscreen();

watch(openFullscreen, (newValue) => {
    newValue ? toggleFullscreen(dashboard.value) : exitFullscreen();
});
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    width: 100%;
    height: 100vh;
    margin-left: 0;
    padding: 15px;
    background-color: #F2F3F7;
    transition: margin-left 0.3s ease-in-out;

    @media (max-width: 1500px) {
        padding: 10px;
    }

	&.show {
        margin-left: var(--side-width);
	}
}

.dashboard {
    display: flex;
}
</style>
