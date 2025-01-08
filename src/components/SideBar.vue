<template>
    <aside>
        <ul>
            <li class="logo"><img src="@img/logo_bw.png" /></li>
            <li
                v-for="icon in iconList"
                :key="icon.name"
                :class="{active: route.name === icon.routeName}"
                @click="goToLink(icon.url, icon.route)"
            >
                <component :is="icon.component" />
                {{ icon.name }}
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

console.log(route);
const iconList = [
    {
        routeName: "board",
        name: "專案看板",
        url: "https://dasherptest.cmh.com.tw/",
        route: "",
        img: "icon_project_board",
        component: "Platform",
    },
    {
        routeName: "home",
        name: "專案管理",
        url: "",
        route: "/",
        img: "icon_customer_board",
        component: "TrendCharts",
    },
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
    url ? window.open(url) : router.push({ path: route });
};

</script>

<style lang="scss" scoped>
aside {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--side-width);
    padding: 20px 0;
    color: #fff;
    background: var(--main-bg-color);
    height: 100vh;
}

.logo {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;

    img {
        width: 72px;
    }
}

li:not(.logo) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    font-size: 16px;
    transition: .3s;
    cursor: pointer;

    svg {
        width: 28px;
        stroke: #fff;
        transition: .3s;
    }

    &.active {
        color:  var(--main-bg-color);
        background: #fff;

        svg {
            stroke: var(--main-bg-color);
        }
    }

    &:hover {

        svg {
            transform: scale(1.2) rotate(-10deg);
        }
    }
}

</style>
