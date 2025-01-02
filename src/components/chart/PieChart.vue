<template>
    <div class="chart__pie">
        <ChartTitle
            title="成案服務比例"
            :type="2"
        />
        <div
            ref="pieContainer"
            class="chart__pie__container"
        />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";

import * as echarts from "echarts";

const pieContainer = ref(null);
const option = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    grid: {
        // right: 5,
        // bottom: 0,
        // left: 0,
        // containLabel: true,
    },
    series: [
        {
            //name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
                {
                    value: 100000,
                    name: "紙本",
                },
                {
                    value: 140000,
                    name: "數位",
                },
                {
                    value: 160000,
                    name: "活動",
                },
            ],
            label: {
                show: true,
                position: "outside",
                edgeDistance: 5,
                minMargin: 10,
                lineHeight: 10,
                //formatter: "{b}", // 顯示名稱
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `NTD ${formattedValue}\n${params.name}`;
                },
                textStyle: {
                    fontSize: 6,
                },
            },
            color: [
                "#4CA8FF", "#4EC478", "#F97F6C",
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
            data: [
                {
                    value: 100000,
                    name: "紙本",
                },
                {
                    value: 140000,
                    name: "數位",
                },
                {
                    value: 160000,
                    name: "活動",
                },
            ],
            itemStyle: {
                borderColor: "#fff", // 分隔線的顏色，可依需求修改
                borderWidth: 1, // 分隔線的寬度，可依需求調整
            },
            color: [
                "#4CA8FF", "#4EC478", "#F97F6C",
            ],
            label: {
                show: true,
                position: "inside",
                formatter: "{d}%", // 顯示百分比
                color: "#fff",
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

onMounted(() => {
    const chart = echarts.init(pieContainer.value);
    chart.setOption(option);
});

</script>

<style lang="scss" scoped>
.chart__pie {
    width: 100%;
    height: 310px;
    margin-left: 10px;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;

    &__container {
        height: 100%;
    }
}
</style>
