<template>
    <div class="dashboard__box chart__row">
        <div class="chart__row__title">
            <span class="type">成</span>
            <div class="title">
                催收進展
            </div>
            <div class="chart__row__detail">
                共計<span>NTD {{ totalAmount.toLocaleString() }}</span>
            </div>
        </div>
        <div class="chart__row__detail">
            已開發票<span>{{ invoiceRate.toFixed(2) }}%</span>，已收回款項<span>{{ actualRate.toFixed(2) }}%</span>
        </div>
        <div
            ref="rowContainer"
            class="chart__row__container"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";
import axios from "axios";

const route = useRoute();
const { formateYear } = storeToRefs(useDashboardStore());
const rowContainer = ref(null);
let chart = null;
/**已開發票比例*/
const invoiceRate = ref(50);
/** 已收回款項比例 */
const actualRate = ref(25);
/** 總金額 */
const totalAmount = ref(6000000);

/** 已開發票 */
const incomeCount = ref([
    130000, 110000, 50000, 70000, 80000, 85436, 108000, 88000, 90000, 70000, 80000, 135436,
]);
/** 已沖帳 */
const trikeCount = ref([
    100000, 80000, 30000, 50000, 70000, 35436, 100000, 80000, 30000, 50000, 70000, 23536,
]);
/** 本月實收 */
const collectionCount = ref([
    24354, 23424, 35334, 50000, 43354, 23424, 35234, 50000, 22354, 23424, 35334, 50000,
]);
/** 已沖帳 左邊padding用 */
const toolCount = computed((() => {
    const maxVal = Math.max(...incomeCount.value);
    const toolVal = maxVal * 0.01;
    return new Array(12).fill(toolVal);
}));

const option = {
    legend: {
        data: [
            "已開發票金額", "已冲帳", "本月實收金額",
        ],
        itemWidth: 8,
        itemHeight: 8,
        itemStyle: {
            borderWidth: 1,
        },
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        top: 20,
        left: 0,
        bottom: 0,
        containLabel: true,
    },
    xAxis: {
        type: "value",
        position: "top",
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: {
            show: false,
        },
    },
    yAxis: [
        {
            type: "category",
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: Array.from({ length: 12 }, (_, i) => `${12 - i}月`),
        },
        {
            type: "category",
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            data: Array.from({ length: 12 }, (_, i) => `${12 - i}月`),
        },
    ],
    series: [
        {
            name: "已開發票金額",
            type: "bar",
            z: 2,
            label: {
                show: true,
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString("en-US");
                    return formattedValue;
                },
                position: "right",
                color: "#0098FA",
            },
            itemStyle: {
                color: "rgba(255, 255, 255, 0)", // 完全透明
                borderRadius: [
                    50, 50, 50, 50,
                ],
                borderWidth: 1,
                borderColor: "#0098FA", // 边框颜色
            },
            barWidth: "14px",
            data: incomeCount.value,
        },
        {
            name: "已冲账工具",
            stack: "incomeStack",
            type: "bar",
            z: 2, // 在上方
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            label: {
                show: false,
            },
            itemStyle: {
                color: "transparent",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            barWidth: "10px", // 保证宽度一致
            barGap: "-85%",
            data: toolCount.value,
        },
        {
            name: "已冲帳",
            stack: "incomeStack",
            type: "bar",
            z: 2, // 在上方
            label: {
                show: true,
                // formatter: "{c}",
                position: "inside",
                formatter: (params) => {
                    const formattedValue = (params.value / incomeCount.value[params.dataIndex]) * 100 ;
                    return formattedValue ? `${formattedValue.toFixed(0)}%` : "";
                },
                fontSize: 8,
            },
            itemStyle: {
                color: "#0098FA",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            barWidth: "10px", // 保证宽度一致
            barGap: "-85%",
            data: trikeCount.value,
        },
        {
            name: "工具",
            type: "bar",
            yAxisIndex: 1,
            z: 3, // 在上方
            itemStyle: {
                color: "transparent",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            barWidth: "2px", // 保持宽度一致
            data: collectionCount.value,
        },
        {
            name: "本月實收金額",
            type: "bar",
            yAxisIndex: 1,
            z: 3, // 在上方
            label: {
                show: true,
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString("en-US");
                    return formattedValue;
                },
                position: "right",
                color: "#F99606",
            },
            itemStyle: {
                color: "#F99606",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            barWidth: "14px", // 保持宽度一致
            barGap: 20,
            data: collectionCount.value,
        },
    ],
};

const getNonAccrual = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/non-accrual`, {
            params: {
                year: formateYear.value,
            },
        });

        if (res.data.code === 1000) {
            incomeCount.value = res.data.result.incomeCount;
            trikeCount.value = res.data.result.trikeCount;
            collectionCount.value = res.data.result.collectionCount;
            totalAmount.value = res.data.result.totalAmount;
            invoiceRate.value = res.data.result.invoiceRate;
            actualRate.value = res.data.result.actualRate;
        }

        console.log(res.data);
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getNonAccrual();

watch(formateYear, () => route.name !== "test" && getNonAccrual());

watch(
    [
        () => incomeCount, () => trikeCount, () => collectionCount, () => toolCount,
    ],
    ([
        newColData, newTrikeCount, newCollectionCount, newToolCount,
    ]) => {
        if (chart) {
            chart.setOption({
                series: [
                    {
                        data: newColData.value, // 更新金額數據
                    },
                    {
                        data: newToolCount.value,
                    },
                    {
                        data: newTrikeCount.value,
                    },
                    {
                        data: newCollectionCount.value,
                    },
                    {
                        data: newCollectionCount.value,
                    },
                ],
            });
        }
    },
    { deep: true },
);

onMounted(() => {
    chart = echarts.init(rowContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart__row {
    width: 100%;
    margin-left: 15px;

    &__title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 20px;
        color: var(--main-text-color);

        .type {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            margin-right: 12px;
            border-radius: 100%;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            background: var(--color-yellow);
        }

        .title {
            margin-right: 12px;
        }
    }

    &__container {
        width: 100%;
        height: calc(100% - 90px);
        margin-top: 15px;
    }

    &__detail {
        display: flex;
        align-items: baseline;
        font-size: 14px;
        color: var(--text-color2);

        span {
            font-size: 20px;
            font-weight: bold;
            color: var(--color-deep-blue);
        }
    }
}
</style>
