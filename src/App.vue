<template>
    <div class="dashboard">
        <SideBar />
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SideBar from "@/components/SideBar.vue";
</script>

<style lang="scss" scoped>
.dashboard {
    display: flex;
}
</style>
