<template>
    <div class="dashboard__box project__box ">
        <ProjectTitle
            :type="2"
            :money="400000"
            :count="10"
            :gross-margin="45"
            :achievement="64"
        />
        <div class="charts">
            <div class="charts__row">
                <ColumnChart
                    :gross-profit="colGrossProfit"
                    :col-data="colData"
                    :service-count="serviceCount"
                />
                <PieChart :amount-ratio="amountRatio" />
            </div>
            <div class="charts__row">
                <ComplateProgressChart />
                <PieChartProportion :amount-ratio="sourceProportion" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectTitle from "@/components/common/ProjectTitle.vue";
import ColumnChart from "@/components/chart/ColumnChart.vue";
import ComplateProgressChart from "@/components/chart/ComplateProgressChart.vue";
import PieChartProportion from "@/components/chart/PieChartProportion.vue";
import PieChart from "@/components/chart/PieChart.vue";

/** 服務成案比例-毛利率 */
const colGrossProfit = ref([
    20, 40, 70, 50,
]);
/** 服務成案比例-金額 */
const colData = ref([
    1853794, 1817660, 1433037, 31236841,
]);
/** 服務成案比例-筆樹 */
const serviceCount = ref([
    "8筆","9筆", "13筆", "30筆",
]);
/** 成案服務比例 */
const amountRatio = ref([
    {
        value: 100000,
        name: "紙本",
    },
    {
        value: 140000,
        name: "數位",
    },
    {
        value: 160000,
        name: "活動",
    },
]);

/** 成案來源比例 */
const sourceProportion = ref([
    120000, 280000,
]);
</script>

<style lang="scss" scoped>

.charts {
    margin-top: 15px;
}
</style>
