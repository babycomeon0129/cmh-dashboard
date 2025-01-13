<template>
    <div class="chart chart__pie">
        <ChartTitle
            :title="`${titleType}案服務金額比例`"
            :type="type"
        />
        <div class="chart__pie__wrapper">
            <div
                ref="pieContainer"
                class="chart__pie__container"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";

import * as echarts from "echarts";

const { amountRatio, type } = defineProps([
    "amountRatio", "type",
]);
const { colorBlue, colorGreen, colorRed } = useDashboardStore();
const titleType = computed(() => type == 1 ? "預" : "成");

const pieContainer = ref(null);
let chart = null;

const option = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    grid: {
        right: 5,
        bottom: 0,
        left: 0,
        containLabel: true,
    },
    series: [
        {
            //name: "Access From",
            type: "pie",
            radius: "60%",
            data: amountRatio,
            avoidLabelOverlap: true,
            label: {
                show: true,
                position: "outer",
                alignTo: "edge",
                overflow: "break",
                edgeDistance: 0,
                distanceToLabelLine: -200,
                minMargin: 10,
                lineHeight: 14,
                //formatter: "{b}", // 顯示名稱
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `NTD ${formattedValue}\n${params.name}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            labelLine: {
                length: 10,
                length2: 5,
            },
            color: [
                colorBlue, colorGreen, colorRed,
            ],
            //  高亮樣式
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
        {
            name: "金額比例",
            type: "pie",
            radius: "50%",
            data: amountRatio,
            itemStyle: {
                fontSize: 8,
            },
            color: [
                "#4CA8FF", "#4EC478", "#F97F6C",
            ],
            label: {
                show: true,
                position: "inside",
                formatter: "{d}%", // 顯示百分比
                color: "#fff",
                textStyle: {
                    fontSize: 8,
                },
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
    ],
};

watch(
    () => amountRatio,
    (newValue) => {
        if (chart) {
            chart.setOption({
                series: [
                    {
                        data: newValue,
                    },
                    {
                        data: newValue,
                    },
                ],
            });
        }
    },
    { deep: true },
);

onMounted(() => {
    chart = echarts.init(pieContainer.value);
    chart.setOption(option);
});

</script>

<style lang="scss" scoped>
.chart__pie {
    width: calc(40% - 5px);

    &__wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    &__container {
        width: 100%;
        height: 50%;
    }
}
</style>
