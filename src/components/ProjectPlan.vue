<template>
    <div class="dashboard__box project__box">
        <ProjectTitle
            :type="1"
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
                    :type="1"
                />
                <SuccessRate :success-rate="successRate" />
            </div>
            <div class="charts__row">
                <PlanProgressChart :progress-plan="progressPlan" />
                <PieChartProportion
                    :amount-ratio="sourceProportion"
                    :type="1"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectTitle from "@/components/common/ProjectTitle.vue";
import ColumnChart from "@/components/chart/ColumnChart.vue";
import SuccessRate from "@/components/chart/SuccessRate.vue";
import PieChartProportion from "@/components/chart/PieChartProportion.vue";
import PlanProgressChart from "@/components/chart/PlanProgressChart.vue";

import axios from "axios";

/** 服務成案比例-毛利率 */
const colGrossProfit = ref([
    20, 40, 70, 50,
]);
/** 服務成案比例-金額 */
const colData = ref([
    40000, 60000, 160000, 140000,
]);
/** 服務成案比例-筆數 */
const serviceCount = ref([
    "8筆","9筆", "13筆", "30筆",
]);

/** 預案來源比例 */
const sourceProportion = ref([
    {
        name: "直客",
        total: 120000,
        count: 4,
    },
    {
        name: "代理商",
        total: 280000,
        count: 6,
    },
]);

/** 預案進展 */
const progressPlan = ref([
    {
        name: "待簽約",
        total: 100000,
        count: 1,
    },
    {
        name: "審批中",
        total: 160000,
        count: 1,
    },
    {
        name: "曾被駁回",
        total: 140000,
        count: 1,
    },
    {
        name: "進行中",
        total: 100000,
        count: 1,
    },
    {
        name: "已取消",
        total: 160000,
        count: 1,
    },
]);
/** 預案服務成案率 */
const successRate = ref([
    {
        name: "純CUE<br />紙本",
        rate: 10,
    },
    {
        name: "純CUE<br />數位",
        rate: 20,
    },
    {
        name: "純CUE<br />數位＋紙本",
        rate: 40,
    },
    {
        name: "企劃案",
        rate: 30,
    },
]);

const getProjectInfo = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/pre-project-info`, {
            params: {
                year: 2024,
            },
        });
        if (res.data.code === 1000) {
            colGrossProfit.value = res.data.result.projectAmount.colGrossProfit;
            colData.value = res.data.result.projectAmount.colData;
            serviceCount.value = res.data.result.projectAmount.serviceCount;
            sourceProportion.value = res.data.result.projectSourceProportion;
            successRate.value = res.data.result.successRate;
            progressPlan.value = res.data.result.projectProgressData;
        }

        console.log(res.data.result);
    }
    catch (error) {
        console.error(error);
    }
};

getProjectInfo();
</script>

<style lang="scss" scoped>
.charts {
    margin-top: 15px;
}
</style>
