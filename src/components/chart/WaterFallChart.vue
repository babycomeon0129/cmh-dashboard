<template>
    <div class="dashboard__box chart__waterfall">
        <div
            ref="waterfallContainer"
            class="chart__waterfall__container"
        />
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const waterfallContainer = ref(null);

const option = {
    title: {
        text: "",
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
        formatter: function (params) {
            let tar;
            if (params[1] && params[1].value !== "-") {
                tar = params[1];
            } else {
                tar = params[2];
            }
            return tar && tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        },
    },
    legend: {
        data: [
            "上月留下", "本月新增", "本月成案", "本月取消",
        ],
    },
    grid: {
        left: 10,
        right: 10,
        bottom: 10,
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            data: (function () {
                let list = [];
                for (let i = 1; i <= 12; i++) {
                    list.push(`${i}月`);
                }
                return list;
            })(),
            // 第二條 x 軸，可以往上或往下偏移
            position: "bottom",
            offset: 30,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: true, // 不顯示刻度線
            },
            splitLine: {
                show: false, // 不顯示分隔線
            },
        },
        {
            type: "category",
            position: "bottom",
            data: (function () {
                return [
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                    "  9", "+7", "-4", "-2",
                ];
            })(),
            axisTick: {
                show: false, // 不顯示刻度線
            },
            axisLabel: {
                align: "center",
            },
        },
    ],
    yAxis: {
        type: "value",
    },
    series: [
        {
            name: "上月留下",
            type: "bar",
            label: {
                show: true,
                position: "top",
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `+${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#345EB4",
            },
            data: [
                48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000,
            ],
            emphasis: {
                focus: "series",
            },
            // 新增 label 配置
            labelLayout: {
                hideOverlap: true,
            },
            labelLine: {
                show: false,
            },
        },
        {
            name: "Placeholder2",
            type: "bar",
            stack: "Total2",
            silent: true,
            itemStyle: {
                borderColor: "transparent",
                color: "transparent",
            },
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            emphasis: {
                itemStyle: {
                    borderColor: "transparent",
                    color: "transparent",
                },
            },
            // 第二個數值：上月留下,
            data: [
                48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000,48000, 44000, 48000, 44000,
            ],
        },
        {
            name: "本月新增",
            type: "bar",
            stack: "Total2",
            label: {
                show: true,
                position: "top",
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `+${formattedValue}`;

                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#4CA8FF",
            },
            data: [
                32000, 30000, 32000, 30000,32000, 30000,32000, 30000,32000, 30000,32000, 30000,
            ],
        },
        {
            name: "Placeholder3",
            type: "bar",
            stack: "Total3",
            silent: true,
            itemStyle: {
                borderColor: "transparent",
                color: "transparent",
            },
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            emphasis: {
                itemStyle: {
                    borderColor: "transparent",
                    color: "transparent",
                },
            },
            // 上月留下+本月新增 - 本月成案
            data: [
                54000, 50000, 54000, 50000, 54000, 50000, 54000, 50000, 54000, 50000, 54000, 50000,
            ],
        },
        {
            name: "本月成案",
            type: "bar",
            stack: "Total3",
            label: {
                show: true,
                position: "bottom",
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `-${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#EFAB29",
            },
            data: [
                26000, 24000, 26000, 24000,26000, 24000,26000, 24000,26000, 24000,26000, 24000,
            ],
        },
        {
            name: "Placeholder4",
            type: "bar",
            stack: "Total4",
            silent: true,
            itemStyle: {
                borderColor: "transparent",
                color: "transparent",
            },
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            emphasis: {
                itemStyle: {
                    borderColor: "transparent",
                    color: "transparent",
                },
            },
            // 上月留下+本月新增 - 本月成案 - 本月取消
            data: [
                44000, 34000, 44000, 34000,44000, 34000, 44000, 34000,44000, 34000, 44000, 34000,
            ],
        },
        {
            name: "本月取消",
            type: "bar",
            stack: "Total4",
            label: {
                show: true,
                position: "bottom",
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return `- ${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#C5C7CC",
            },
            data: [
                10000, 16000,10000, 16000,10000, 16000,10000, 16000,10000, 16000,10000, 16000,
            ],
        },
    ],
};

onMounted(() => {
    const chart = echarts.init(waterfallContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart__waterfall {
    margin-top: 15px;

    &__container {
        width: 100%;
        height: 297px;
    }
}
</style>
