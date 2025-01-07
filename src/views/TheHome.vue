<template>
    <div class="page">
        <div class="title">
            <h1>專案管理</h1>
            <div class="date">
                數據更新時間： {{ updateTime }}
            </div>
        </div>
        <div class="container">
            <YearIncome />
            <div class="charts">
                <div class="project">
                    <div class="project__detail">
                        <ProjectComplate />
                        <ProjectPlan />
                    </div>
                    <div class="change">
                        <WaterFallChart />
                    </div>
                </div>
                <RowChart />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import YearIncome from "@/components/YearIncome.vue";
import ProjectComplate from "@/components/ProjectComplate.vue";
import ProjectPlan from "@/components/ProjectPlan.vue";
import WaterFallChart from "@/components/chart/WaterFallChart.vue";
import RowChart from "@/components/chart/RowChart.vue";
import { storeToRefs } from "pinia";

const store = useDashboardStore();
const { updateTime } = storeToRefs(store);

</script>

<style lang="scss" scoped>

h1 {
    margin: 0;
    font-size: 28px;
    line-height: 1;
}

.page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.title {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.date {
    margin-left: 15px;
}

.container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.charts {
    display: flex;
    width: 100%;
    padding-top: 14px;
    flex-grow: 1;
}

.project {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 80%;

    &__detail {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
}

.change {
    flex-grow: 1;
}
</style>
