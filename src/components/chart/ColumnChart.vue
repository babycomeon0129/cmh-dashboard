<template>
    <div class="chart__col">
        <ChartTitle
            title="成案服務比例"
            :type="2"
        />
        <div
            ref="colContainer"
            class="chart__col__container"
        />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import * as echarts from "echarts";

const { grossProfit, colData } = defineProps([
    "grossProfit", "colData",
]);

const colContainer = ref(null);
const colors = [
    "#5470C6", "#91CC75", "#EE6666",
];

const barColors = [
    "#FAC858", "#4CA8FF", "#91CC75", "#EE6666",
];
const option = {
    // title: {
    //     text: "成案服務比例",
    //     left: "center",
    // },
    color: colors,
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
    // toolbox: {
    //     feature: {
    //         dataView: {
    //             show: true,
    //             readOnly: false,
    //         },
    //         restore: { show: true },
    //         saveAsImage: { show: true },
    //     },
    // },
    // legend: {
    //     data: [
    //         "毛利", "金額",
    //     ],
    //     left: "center",
    // },
    // legend: {
    //     data: [
    //         "純cue紙本", "純cue數位", "純cue紙本+數位", "企劃",
    //     ],
    // },
    xAxis: [
        {
            type: "category",
            axisTick: {
                alignWithLabel: true,
            },
            data: [
                "8筆","9筆", "13筆", "30筆",
            ],
            axisLabel: {
                fontSize: 8,
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
                // 顯示網格線
                show: true,
                // 設定成虛線
                lineStyle: {
                    type: "dashed", // ★ 改成虛線
                    color: "#DEE3E9", // 可自行調整顏色
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
            style: { fill: "#FAC858" },
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
            style: { fill: "#4CA8FF" },
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
            style: { fill: "#91CC75" },
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
            style: { fill: "#EE6666" },
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
            name: "毛利",
            type: "bar",
            barWidth: "30%",
            itemStyle: {
                color: function (params) {
                    return barColors[params.dataIndex];
                },
            },
            label: {
                show: true,
                position: "inside", // 可視情況改成 'top', 'inside', 'insideBottom'等
                formatter: "{c}%", // {c}會替換為該數值，後面加上%符號
                // 若需自行計算百分比，可用 formatter callback 函數
                // formatter: (params) => params.value + '%'
                color: "#fff",
                fontSize: 9,
            },
            data: grossProfit,
        },
        {
            name: "金額",
            type: "line",
            yAxisIndex: 1, // 將指向 y 軸的 index 調整為 1（因為只有兩個 y 軸了）
            itemStyle: {
                color: "#D878B1",
            },
            label: {
                show: true,
                position: "top", // 可視情況改成 'top', 'inside', 'insideBottom'等
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString("en-US");
                    return formattedValue;
                },
                color: "#000",
                fontSize: 8,
            },
            data: colData,
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
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
}

.chart__col__container {
    height: 270px;
    margin-top: 5px;
}
</style>
