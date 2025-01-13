<template>
    <div class="chart chart__pie">
        <ChartTitle
            :title="`${titleType}案來源比例`"
            :type="type"
        />
        <div
            ref="pieContainer"
            class="chart__pie__container"
        />
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
const { colorYellow, colorBlue } = useDashboardStore();
const titleType = computed(() => type == 1 ? "預" : "成");
const pieContainer = ref(null);
let chart = null;
const option = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    grid: {
        // right: 5,
        bottom: 0,
        // left: 0,
        containLabel: true,
    },
    series: [
        {
            //name: "Access From",
            type: "pie",
            radius: "60%",
            data: amountRatio.map(data => data.total),
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
                    return `NTD ${formattedValue}\n${amountRatio[params.dataIndex].name}(${amountRatio[params.dataIndex].count}筆)`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            color: [
                colorYellow ,colorBlue,
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
            radius: "60%",
            data: amountRatio.map(data => data.total),
            itemStyle: {
                borderColor: "#fff",
                borderWidth: 3,
            },
            color: [
                "#4CA8FF", "#4EC478", "#F97F6C",
            ],
            label: {
                show: true,
                position: "inside",
                formatter: "{d}%",
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
                        data: newValue.map(data => data.total),
                    },
                    {
                        data: newValue.map(data => data.total),
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
    aspect-ratio: 1.65;
    margin-top: 10px;

    &__container {
        width: 100%;
        height: 100%;
        max-height: 99%;
    }
}
</style>
