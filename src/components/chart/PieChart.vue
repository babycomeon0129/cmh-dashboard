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
    series: [
        {
            name: "金額",
            type: "pie",
            radius: "70%",
            data: amountRatio,
            avoidLabelOverlap: true,
            z: 1,
            label: {
                show: true,
                position: "outer",
                alignTo: "edge",
                overflow: "break",
                edgeDistance: 0,
                distanceToLabelLine: -200,
                minMargin: 10,
                lineHeight: innerWidth > 1500 ? 20 : 13,
                fontSize: innerWidth > 1500 ? 12 : 8,
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `NTD ${formattedValue}\n${params.name}`;
                },
            },
            labelLine: {
                length: 10,
                length2: 5,
            },
            labelLayout: {
                hideOverlap: false, // 確保標籤不會因重疊而隱藏
                //moveOverlap: "shiftY", // 遇到重疊時移動標籤
            },
            color: [
                colorBlue, colorGreen, colorRed,
            ],
        },
        {
            name: "金額比例",
            type: "pie",
            radius: "70%",
            data: amountRatio,
            z: 1, // 設定為更高層級
            itemStyle: {
                fontSize: 8,
                borderColor: "#fff",
                borderWidth: 1,
            },
            color: [
                "#4CA8FF", "#4EC478", "#F97F6C",
            ],
            label: {
                show: true,
                position: "inside",
                formatter: (params) => `${params.percent.toFixed(0)}%`,
                color: "#fff",
                fontSize: innerWidth > 1500 ? 10 : 8,
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
