<template>
    <div class="dashboard__box project__box">
        <ProjectTitle
            :type="2"
            :money="400000"
            :count="10"
            :gross-margin="45"
            :achievement="64"
        />
    </div>
</template>

<script setup>
import ProjectTitle from "@/components/common/ProjectTitle.vue";
</script>

<style lang="scss" scoped>
</style>
