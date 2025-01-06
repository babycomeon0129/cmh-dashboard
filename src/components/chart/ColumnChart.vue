<template>
    <div class="chart chart__col">
        <ChartTitle
            :title="`${titleType}案服務比例`"
            :type="type"
        />
        <div
            ref="colContainer"
            class="chart__col__container"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";
import * as echarts from "echarts";

const { grossProfit, colData, serviceCount, type } = defineProps([
    "grossProfit", "colData", "serviceCount", "type",
]);
const { colorBlue, colorGreen, colorRed, colorYellow } = useDashboardStore();
const colContainer = ref(null);

const titleType = computed(() => type == 1 ? "預" : "成");

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
        right: 5,
        bottom: 0,
        left: 0,
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
                fontSize: 8,
                formatter: (value, index) => {
                    return `{color${index}|${value}}`;
                },
                rich: {
                    color0: {
                        fontSize: 11,
                        color: colorYellow,
                    },
                    color1: {
                        fontSize: 11,
                        color: colorBlue,
                    },
                    color2: {
                        fontSize: 11,
                        color: colorGreen,
                    },
                    color3: {
                        fontSize: 11,
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
                fontSize: 11,
            },
            axisLine: {
                show: false,
                // lineStyle: {
                //     color: colors[0],
                // },
            },
            axisLabel: {
                formatter: "{value}%",
                fontSize: 11,
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
                fontSize: 11,
            },
            axisLine: {
                show: false,
                // lineStyle: {
                //     color: colors[2],
                // },
            },
            axisLabel: {
                formatter: "{value}",
                fontSize: 11,
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
    graphic: [
        // 純cue紙本 (黃色)
        {
            type: "rect",
            left: 10,
            top: "5%",
            shape: {
                width: 10,
                height: 10,
            },
            style: { fill: colorYellow },
        },
        {
            type: "text",
            left: 25,
            top: "5%",
            style: {
                text: "純cue紙本",
                fontSize: 10,
            },
        },
        // 純cue數位 (藍色)
        {
            type: "rect",
            left: 80,
            top: "5%",
            shape: {
                width: 10,
                height: 10,
            },
            style: { fill: colorBlue },
        },
        {
            type: "text",
            left: 95,
            top: "5%",
            style: {
                text: "純cue數位",
                fontSize: 10,
            },
        },
        // 純cue紙本+數位 (綠色)
        {
            type: "rect",
            left: 150,
            top: "5%",
            shape: {
                width: 10,
                height: 10,
            },
            style: { fill: colorGreen },
        },
        {
            type: "text",
            left: 165,
            top: "5%",
            style: {
                text: "純cue紙本+數位",
                fontSize: 10,
            },
        },
        // 企劃 (紅色)
        {
            type: "rect",
            left: 245,
            top: "5%",
            shape: {
                width: 10,
                height: 10,
            },
            style: { fill: colorRed },
        },
        {
            type: "text",
            left: 260,
            top: "5%",
            style: {
                text: "企劃",
                fontSize: 10,
            },
        },
        // 毛利 (紫色)
        {
            type: "rect",
            left: 290,
            top: "6.5%",
            shape: {
                width: 8,
                height: 2,
            },
            style: { fill: "#D878B1" },
        },
        {
            type: "text",
            left: 305,
            top: "5%",
            style: {
                text: "毛利率",
                fontSize: 10,
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
                fontSize: 9,
            },
            data: colData,
        },
        {
            name: "毛利率",
            type: "line",
            yAxisIndex: 0, // 將指向 y 軸的 index 調整為0 （因為只有兩個 y 軸了）
            itemStyle: {
                color: "#D878B1",
            },
            label: {
                show: false,
                position: "top", // 可視情況改成 'top', 'inside', 'insideBottom'等
                formatter: "{c}%",
                color: "#000",
                fontSize: 8,
            },
            data: grossProfit,
        },
    ],
};

onMounted(() => {
    const chart = echarts.init(colContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart__col {
    flex-shrink: 0;
    width: 57%;
    aspect-ratio: 1.32;
}

.chart__col__container {
    height: 270px;
    margin-top: 5px;
}
</style>
