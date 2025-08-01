<template>
    <div class="chart column-chart">
        <ChartTitle
            :title="`${titleType}案服務比例`"
            :type="type"
        />
        <div class="column-chart__legend">
            <div
                v-for=" legend in legendList"
                :key="legend">
                {{ legend }}
            </div>
        </div>
        <div
            ref="colContainer"
            class="column-chart__container"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";
import * as echarts from "echarts";

const { grossProfit, colData, serviceCount, type } = defineProps([
    "grossProfit", "colData", "serviceCount", "type",
]);
const { colorBlue, colorGreen, colorRed, colorYellow, colorPurple } = useDashboardStore();
const colContainer = ref(null);
let chart = null;

const titleType = computed(() => type == 1 ? "預" : "成");

const legendList = [
    "純CUE_紙本", "純CUE_數位", "純CUE_紙數", "企劃案", "毛利率",
];

const barColors = [
    colorYellow, colorBlue, colorGreen, colorRed,
];

const option = {
    color: barColors,
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
        },
    },
    grid: {
        top: 30,
        right: 1,
        bottom: 0,
        left: 1,
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            axisTick: {
                alignWithLabel: true,
            },
            data: serviceCount,
            axisLabel: {
                interval: 0,
                fontSize: 8,
                formatter: (value, index) => {
                    return `{color${index}|${value}}`;
                },
                rich: {
                    color0: {
                        fontSize: innerWidth > 1500 ? 11 : 8,
                        color: colorYellow,
                    },
                    color1: {
                        fontSize: innerWidth > 1500 ? 11 : 8,
                        color: colorBlue,
                    },
                    color2: {
                        fontSize: innerWidth > 1500 ? 11 : 8,
                        color: colorGreen,
                    },
                    color3: {
                        fontSize: innerWidth > 1500 ? 11 : 8,
                        color: colorRed,
                    },
                },
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            name: "毛利率",
            position: "right",
            alignTicks: true,
            nameTextStyle: {
                fontSize: innerWidth > 1500 ? 11 : 7,
            },
            axisLine: {
                show: false,
                // lineStyle: {
                //     color: colors[0],
                // },
            },
            axisLabel: {
                formatter: "{value}%",
                fontSize: innerWidth > 1500 ? 11 : 7,
            },
            splitLine: {
                show: false,
            },
        },
        // 將原本的 Precipitation Y 軸設定刪除
        {
            type: "value",
            name: "金額",
            position: "left",
            alignTicks: true,
            nameTextStyle: {
                fontSize: innerWidth > 1500 ? 11 : 7,
            },
            axisLine: {
                show: false,
                // lineStyle: {
                //     color: colors[2],
                // },
            },
            axisLabel: {
                formatter: "{value}",
                fontSize: innerWidth > 1500 ? 11 : 7,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed", // 設置為虛線
                    color: "#DEE3E9", // 可自行調整顏色
                    width: 1, // 可選，設置線條寬度
                },
            },
        },
    ],
    series: [
        {
            name: "金額",
            yAxisIndex: 1, // 將指向 y 軸的 index 調整為0 （因為只有兩個 y 軸了）
            type: "bar",
            barWidth: "30%",
            itemStyle: {
                color: function (params) {
                    return barColors[params.dataIndex];
                },
            },
            label: {
                show: true,
                position: "top", // 可視情況改成 'top', 'inside', 'insideBottom'等
                formatter: (params) => params.value.toLocaleString(),
                color: "#000",
                fontSize: innerWidth > 1500 ? 9 : 7,
            },
            data: colData,
        },
        {
            name: "毛利率",
            type: "line",
            yAxisIndex: 0, // 將指向 y 軸的 index 調整為0 （因為只有兩個 y 軸了）
            itemStyle: {
                color: colorPurple,
            },
            label: {
                show: false,
            },
            data: grossProfit,
        },
    ],
};

watch(
    [
        () => colData, () => grossProfit, () => serviceCount,
    ],
    ([
        newColData, newGrossProfit, newServiceCount,
    ]) => {
        if (chart) {
            chart.setOption({
                xAxis: [
                    {
                        data: newServiceCount, // 更新 x 軸數據
                    },
                ],
                series: [
                    {
                        data: newColData, // 更新金額數據
                    },
                    {
                        data: newGrossProfit, // 更新毛利率數據
                    },
                ],
            });
        }
    },
    { deep: true },
);

onMounted(() => {
    chart = echarts.init(colContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.column-chart {
    flex-shrink: 0;
    width: calc(60% - 5px);
    aspect-ratio: 16 / 9;

    &__legend {
        display: flex;
        margin-top: 20px;
        font-size: 0.7rem;

        @media (max-width: 1500px)  {
            margin-top: 8px;
        }

        div {
            display: flex;
            align-items: center;
            margin-right: 5px;

            &::before {
                content: "";
                display: block;
                width: 8px;
                height: 8px;
                margin-right: 3px;
                background: var(--color-yellow);

                @media (max-width: 1500px) {
                    width: 5px;
                    height: 5px;
                }
            }

            &:nth-child(2)::before {
                background: var(--color-blue);
            }

            &:nth-child(3)::before {
                background: var(--color-green);
            }

            &:nth-child(4)::before {
                background: var(--color-red);
            }

            &:nth-child(5)::before {
                height: 2px;
                background: var(--color-purple);
            }
        }
    }

    &__container {
        height: 100%;
        margin-top: 5px;
    }
}

</style>
