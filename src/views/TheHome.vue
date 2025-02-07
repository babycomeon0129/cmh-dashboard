<template>
    <div class="page">
        <HomeHeader />
        <div class="container">
            <YearIncome />
            <div class="charts">
                <div class="project">
                    <div class="project__detail">
                        <ProjectComplate />
                        <ProjectPlan />
                    </div>
                    <div class="change">
                        <MonthlyTrendViewer />
                    </div>
                </div>
                <RowChart />
            </div>
        </div>
    </div>
</template>

<script setup>
import HomeHeader from "@/components/common/HomeHeader.vue";
import YearIncome from "@/components/YearIncome.vue";
import ProjectComplate from "@/components/ProjectComplate.vue";
import ProjectPlan from "@/components/ProjectPlan.vue";
import MonthlyTrendViewer from "@/components/MonthlyTrendViewer.vue";
import RowChart from "@/components/chart/RowChart.vue";

</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 15px;

    @media (max-width: 1500px) {
        padding: 10px;
    }
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

    @media (max-width: 1500px) {
		padding-top: 10px;
    }
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
