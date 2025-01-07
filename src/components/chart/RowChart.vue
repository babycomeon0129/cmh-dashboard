<template>
    <div class="dashboard__box chart__row">
        <div class="chart__row__title">
            <span class="type">成</span>
            <div class="title">
                催收進展
            </div>
            <div class="chart__row__detail">
                共計<span>NTD 600,000</span>
            </div>
        </div>
        <div class="chart__row__detail">
            已開發票<span>50%</span>，已收回款項<span>25%</span>
        </div>
        <div
            ref="rowContainer"
            class="chart__row__container"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const rowContainer = ref(null);
let chart = null;

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
            "收入", "已冲帳", "已收回款项",
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
            name: "收入",
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
                    return `${formattedValue.toFixed(0)}%`;
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
            name: "已收回款项",
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

watch([
    () => incomeCount, () => trikeCount, () => collectionCount,
], ([
    newIncomeCount, newTrikeCount, newCollectionCount,
]) => {
    if (chart) {
        chart.setOption({
            series: [
                {
                    data: newIncomeCount,
                },
                {
                    data: toolCount.value,
                },
                {
                    data: newTrikeCount,
                },
                {
                    data: newCollectionCount,
                },
                {
                    data: newCollectionCount,
                },
            ],
        });
    }
});

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
