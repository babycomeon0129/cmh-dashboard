<template>
    <aside
        class="sidebar"
        :class="{ 'sidebar--show': showSideBar}"
    >
        <div class="sidebar__logo">
            <img src="@img/logo_bw.png" />
        </div>
        <ul class="sidebar__nav">
            <li
                v-for="icon in iconList"
                :key="icon.name"
                class="sidebar__nav-item"
                :class="{'sidebar__nav-item--active': route.name === icon.routeName}"
                @click="goToLink(icon.url, icon.route)"
            >
                <component :is="icon.component" />
                {{ icon.name }}
            </li>
        </ul>
        <div
            class="sidebar__logout"
            @click="logout"
        >
            <img src="@img/icon_logout.svg" />
            登出
        </div>
        <el-icon
            class="sidebar__toggle"
            @click="showSideBar = !showSideBar"
        >
            <ArrowRightBold :class="{close: showSideBar}" />
        </el-icon>
    </aside>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const store = useDashboardStore();
const { showSideBar, isLogin } = storeToRefs(store);

const iconList = [
    // {
    //     routeName: "home",
    //     name: "專案管理",
    //     url: "",
    //     route: "/",
    //     img: "icon_customer_board",
    //     component: "TrendCharts",
    // },
    {
        routeName: "test",
        name: "測試數據",
        url: "",
        route: "/test",
        img: "",
        component: "IceDrink",
    },
];

const goToLink = (url, route) => {
    showSideBar.value = !showSideBar.value;
    url ? window.open(url) : router.push({ path: route });
};

const logout = async () => {
    showSideBar.value = false;
    isLogin.value = false;
    router.push({ path: "/login" });
};

</script>

<style lang="scss" scoped>
@use "@style/sideBar";
</style>
