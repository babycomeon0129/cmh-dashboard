<template>
    <div class="grid-item card">
        <ProjectTitle
            :type="2"
            :total-amount="titleInfo.totalAmount"
            :total-count="titleInfo.totalCount"
            :gross-margin="titleInfo.grossMargin"
            :confirm-rate="titleInfo.confirmRate"
        />
        <div class="charts">
            <div class="charts__row">
                <ColumnChart
                    :gross-profit="colGrossProfit"
                    :col-data="colData"
                    :service-count="serviceCount"
                    :type="2"
                />
                <PieChart
                    :amount-ratio="amountRatio"
                    :type="2"
                />
            </div>
            <div class="charts__row">
                <ProgressChart :progress-data="progressData" />
                <PieChartProportion
                    :amount-ratio="sourceProportion"
                    :type="2"
                />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import ProjectTitle from "@/components/common/ProjectTitle.vue";
import ColumnChart from "@/components/chart/ColumnChart.vue";
import ProgressChart from "@/components/chart/ProgressChart.vue";
import PieChartProportion from "@/components/chart/PieChartProportion.vue";
import PieChart from "@/components/chart/PieChart.vue";
import { storeToRefs } from "pinia";
import axios from "axios";

const route = useRoute();
const { formateYear } = storeToRefs(useDashboardStore());
/** 標題資訊 */
const titleInfo = ref({
    totalAmount: 400000,
    totalCount: 10,
    grossMargin: 45,
    confirmRate: 64,
});
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
/** 成案服務比例 */
const amountRatio = ref([
    {
        value: 1000000,
        name: "紙本",
    },
    {
        value: 1400000,
        name: "數位",
    },
    {
        value: 1600000,
        name: "活動",
    },
]);

/** 成案進展 */
const progressData = ref([
    {
        name: "進行中",
        total: 100000,
        count: 4,
    },
    {
        name: "已終止",
        total: 120000,
        count: 6,
    },
    {
        name: "已結案",
        total: 180000,
        count: 9,
    },
]);

/** 成案來源比例 */
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

const getProjectInfo = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/project-info`, {
            params: {
                year: formateYear.value,
            },
        });
        if (res.data.code === 1000) {
            amountRatio.value = res.data.result.amountRatio;
            colGrossProfit.value = res.data.result.projectAmount.colGrossProfit;
            colData.value = res.data.result.projectAmount.colData;
            serviceCount.value = res.data.result.projectAmount.serviceCount;
            sourceProportion.value = res.data.result.projectSourceProportion;
            titleInfo.value.totalCount = res.data.result.totalCount;
            titleInfo.value.totalAmount = res.data.result.totalAmount;
            titleInfo.value.grossMargin = res.data.result.grossMargin;
            titleInfo.value.confirmRate = res.data.result.confirmRate;
            progressData.value = res.data.result.projectProgressData;
        }

        console.log(res.data.result);
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getProjectInfo();

watch(formateYear, () => route.name !== "test" && getProjectInfo());
</script>

<style lang="scss" scoped>
.charts {
    margin-top: 15px;

    @media (max-width: 1500px) {
        margin-top: 10px;
    }
}
</style>
