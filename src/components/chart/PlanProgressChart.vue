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

const progressPlanData = ref([
    {
        value:100000,
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
    // legend: {
    //     top: "5%",
    //     left: "center",
    // },
    grid: {
        containLabel: true,
    },
    series: [
        {
            name: "Access From",
            type: "pie",
            radius: [
                "25%", "65%",
            ],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: "outside",
                edgeDistance: 5,
                minMargin: 10,
                lineHeight: 13,
                //formatter: "{b}", // 顯示名稱
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `NTD ${formattedValue}\n${params.name}`;
                },
                textStyle: {
                    fontSize: 10,
                },
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 12,
                    fontWeight: "bold",
                },
            },
            itemStyle: {
                borderColor: "#fff", // 分隔線的顏色，可依需求修改
                borderWidth: 1, // 分隔線的寬度，可依需求調整
            },
            labelLine: {
                show: true,
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
                borderColor: "#fff", // 分隔線的顏色，可依需求修改
                borderWidth: 1, // 分隔線的寬度，可依需求調整
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
    const chart = echarts.init(pieContainer.value);
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
        height: 100%;
    }
}

.chart__pie {
    width: 100%;
    height: 310px;
    margin-left: 10px;

    &__container {
        height: 100%;
    }
}

</style>
