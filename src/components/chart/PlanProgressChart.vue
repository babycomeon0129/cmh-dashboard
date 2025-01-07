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
import { ref, onMounted } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";
import * as echarts from "echarts";

const { colorBlue, colorYellow, colorRed, colorGray, colorDeepBlue } = useDashboardStore();
const colors = [
    colorDeepBlue, colorYellow, colorRed, colorBlue, colorGray,
];

const pieContainer = ref(null);
let chart = null;

const progressPlanData = ref([
    {
        value: 100000,
        name: "待簽約",
    },
    {
        value: 160000,
        name: "審批中",
    },
    {
        value: 140000,
        name: "曾被駁回",
    },
    {
        value: 100000,
        name: "進行中",
    },
    {
        value: 160000,
        name: "已取消",
    },
]);

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
                    return `NTD ${formattedValue}\n${params.name}`;
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
            data: progressPlanData.value,
        },
        {
            name: "Access From",
            type: "pie",
            radius: [
                "25%", "65%",
            ],
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
            data: progressPlanData.value,
        },
    ],
};

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
    width: 57%;
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
    width: 60%;
    height: 100%;
}

</style>
