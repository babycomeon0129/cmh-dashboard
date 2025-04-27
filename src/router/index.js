import { createRouter, createWebHistory } from "vue-router";
import TheHome from "@/views/TheHome.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/test",
        },
        {
            path: "/home",
            name: "home",
            component: TheHome,
        },
        {
            path: "/test",
            name: "test",
            component: () => import("@/views/TheTest.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/TheLogin.vue"),
        },
    ],
});

export default router;
