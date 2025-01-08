<template>
    <div class="chart chart__progress__plan">
        <ChartTitle
            title="預案進展"
            :type="1"
        />
        <div class="chart__progress__plan__content">
            <div
                ref="pieContainer"
                class="chart__pie__container"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";
import * as echarts from "echarts";

const { progressPlan } = defineProps([
    "progressPlan",
]);
const { colorBlue, colorYellow, colorRed, colorGray, colorDeepBlue } = useDashboardStore();
const colors = [
    colorDeepBlue, colorYellow, colorRed, colorBlue, colorGray,
];

const pieContainer = ref(null);
let chart = null;

const option = {
    tooltip: {
        trigger: "item",
    },
    grid: {
        bottom: 0,
        containLabel: true,
    },
    series: [
        {
            name: "Access From",
            type: "pie",
            radius: [
                "25%", "62%",
            ],
            avoidLabelOverlap: false,
            minShowLabelAngle: 0,
            label: {
                show: true,
                position: "outer",
                alignTo: "edge",
                overflow: "break",
                edgeDistance: 0,
                distanceToLabelLine: -300,
                minMargin: 10,
                lineHeight: 17,
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    const index = params.dataIndex;
                    return `NTD ${formattedValue}\n${progressPlan[index].name}`;
                },
                textStyle: {
                    fontSize: 10,
                },
            },
            labelLine: {
                length: 10,
                length2: 100,
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 12,
                    fontWeight: "bold",
                },
            },
            itemStyle: {
                borderColor: "#fff",
                borderWidth: 1,
            },
            color: colors,
            data: progressPlan.map(data => data.total),
        },
        {
            name: "Access From",
            type: "pie",
            radius: [
                "25%", "65%",
            ],
            minShowLabelAngle: 0,
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: "inside",
                formatter:(params) => `${params.percent.toFixed(0)}%`,
                color: "#fff",
                fontSize: 8,
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 12,
                    fontWeight: "bold",
                },
            },
            itemStyle: {
                borderColor: "#fff",
                borderWidth: 1,
            },
            labelLine: {
                show: false,
            },
            color: colors,
            data: progressPlan.map(data => data.total),
        },
    ],
};

watch(
    () => progressPlan,
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
.chart__progress__plan {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: calc(60% - 5px);
    aspect-ratio: 2.7;
    margin-top: 10px;

    &__content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
}

.chart__pie__container {
    width: 65%;
    height: 100%;
}

</style>
