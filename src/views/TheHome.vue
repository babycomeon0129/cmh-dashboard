<template>
    <div class="page-home">
        <HomeHeader />
        <div class="page-home__container">
            <YearIncome />
            <div class="page-home__charts">
                <div class="page-home__project">
                    <div class="page-home__detail">
                        <ProjectComplete />
                        <ProjectPlan />
                    </div>
                    <div class="page-home__change">
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
.page-home {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 15px;

    @media (max-width: 1500px) {
        padding: 10px;
    }
}

.page-home__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.page-home__charts {
    display: flex;
    width: 100%;
    padding-top: 14px;
    flex-grow: 1;
}

.page-home__project {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 80%;
}

.page-home__detail {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.page-home__change {
    flex-grow: 1;
}
</style>
