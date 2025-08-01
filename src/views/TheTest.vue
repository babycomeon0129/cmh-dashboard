<template>
    <div class="page-test">
        <HomeHeader />
        <div class="page-test__container">
            <YearIncome />
            <div class="page-test__charts">
                <div class="page-test__project">
                    <div class="page-test__detail">
                        <ProjectComplete />
                        <ProjectPlan />
                    </div>
                    <div class="page-test__change">
                        <MonthlyTrend />
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
import ProjectComplete from "@/components/ProjectComplete.vue";
import ProjectPlan from "@/components/ProjectPlan.vue";
import MonthlyTrend from "@/components/MonthlyTrend.vue";
import RowChart from "@/components/chart/RowChart.vue";
</script>

<style lang="scss" scoped>

.page-test {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 15px;

    @media (max-width: 1500px) {
        padding: 10px;
    }
}

.page-test__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.page-test__charts {
    display: flex;
    width: 100%;
    padding-top: 14px;
    flex-grow: 1;
}

.page-test__project {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 80%;
}

.page-test__detail {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.page-test__change {
    flex-grow: 1;
}
</style>
