<template>
    <div class="dashboard">
        <SideBar v-if="route.name !== 'login'" />
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
                    <component
                        :is="Component"
                        :key="componentKey"
                    />
                </main>
            </transition>
        </router-view>

    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import SideBar from "@/components/SideBar.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { useFullscreen } from "@/composable/useFullscreen.js";
const store = useDashboardStore();
const { showSideBar, openFullscreen, isLogin } = storeToRefs(store);

const route = useRoute();
const router = useRouter();
const { toggleFullscreen, exitFullscreen, isFullscreen } = useFullscreen();
const dashboard = ref(null);
const componentKey = ref(0);

watch(openFullscreen, (newValue) => {
    newValue ? toggleFullscreen(dashboard.value) : exitFullscreen();
});

watch(isFullscreen, (newValue) => {
    openFullscreen.value = newValue;
    componentKey.value ++;
});

//if (!isLogin.value) router.push({ path: "/login" });
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    width: 100%;
    height: 100vh;
    margin-left: 0;
    background-color: #F2F3F7;
    transition: margin-left .3s ease-in-out;

	&.show {
        margin-left: var(--side-width);
	}
}

.dashboard {
    display: flex;
}
</style>
