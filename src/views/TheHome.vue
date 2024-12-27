<template>
    <main>
        <div class="title">
            <h1>專案管理</h1>
            <div class="date">
                數據更新時間：2024-11-05 14:50: 01
            </div>
        </div>
        <div class="container">
            <YearIncome />
            <div class="charts">
                <div class="project">
                    <ProjectComplate />
                    <ProjectPlan />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import YearIncome from "@/components/YearIncome.vue";
import ProjectComplate from "@/components/ProjectComplate.vue";
import ProjectPlan from "@/components/ProjectPlan.vue";

</script>

<style lang="scss" scoped>
main {
    width: calc(100% - var(--side-width));
    margin-left: var(--side-width);
    padding: 15px;
}

h1 {
    margin: 0;
    font-size: 28px;
}

.title {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.date {
  margin-left: 15px;
}

.charts {
  margin-top: 14px;
}

.project {
  display: flex;
  justify-content: space-between;
  width: 80%;
}
</style>
