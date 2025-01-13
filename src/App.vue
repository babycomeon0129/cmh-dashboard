<template>
    <div class="dashboard">
        <SideBar />
        <router-view v-slot="{ Component }">
            <transition
                name="slide-fade"
                mode="out-in"
            >
                <main
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
import { RouterView, useRoute } from "vue-router";
import SideBar from "@/components/SideBar.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";

const store = useDashboardStore();
const { showSideBar } = storeToRefs(store);

const route = useRoute();
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    width: 100%;
    // min-width: 1800px;
    height: 100vh;
    margin-left: 0;
    padding: 15px;
    transition: margin-left 0.3s ease-in-out;

	&.show {
        margin-left: var(--side-width);
	}
}

.dashboard {
    display: flex;
}
</style>
