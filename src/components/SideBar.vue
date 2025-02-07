<template>
    <aside :class="{ show: showSideBar}">
        <div class="logo"><img src="@img/logo_bw.png" /></div>
        <ul>
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
        <div class="logout">
            <img src="@img/icon_logout.svg" />
            登出
        </div>
        <el-icon
            class="arrow"
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
const { showSideBar } = storeToRefs(store);

const iconList = [
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
    showSideBar.value = !showSideBar.value;
    url ? window.open(url) : router.push({ path: route });
};

</script>

<style lang="scss" scoped>
aside {
    position: fixed;
    top: 0;
    left: calc(-1 * var(--side-width) + 5px);
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: var(--side-width);
    padding: 20px 0;
    color: #fff;
    background: var(--main-bg-color);
    height: 100vh;
    transition: .3s;

    &.show {
        left: 0;
    }

    .arrow {
        content: ">";
        position: absolute;
        top: 53px;
        left: var(--side-width);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 35px;
        border-radius: 0  100% 100% 0;
        font-size: 1.14rem;
        background: var(--main-bg-color);
        cursor: pointer;
        transition: .3s;

        &:hover {
            font-size: 1.43rem;
            font-weight: bold;
        }

        svg {
            transition: .5s;

            &.close {
                transform: rotateY(180deg);
            }
        }
    }
}

.logo {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;

    img {
        width: 72px;
    }
}

ul {
    flex-grow: 1;
}

li, .logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    font-size: 1.143rem;
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
