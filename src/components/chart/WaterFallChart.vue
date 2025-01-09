<template>
    <div class="chart__waterfall">
        <div
            ref="waterfallContainer"
            class="chart__waterfall__container"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";
import axios from "axios";

const route = useRoute();
const { colorDeepBlue, colorBlue, colorYellow, colorGray } = useDashboardStore();
const { formateYear } = storeToRefs(useDashboardStore());

const waterfallContainer = ref(null);
let chart = null;

/** 上月留下 */
const lastMonth = ref([
    48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000,
]);
/** 本月新增 */
const thisMonth = ref([
    32000, 30000, 32000, 30000,32000, 30000,32000, 30000,32000, 30000,32000, 30000,
]);
/** 本月成案 */
const thisMonthComplete = ref([
    26000, 24000, 26000, 24000,26000, 24000,26000, 24000,26000, 24000,26000, 24000,
]);
/** 本月取消 */
const thisMonthCancel = ref([
    10000, 16000,10000, 16000,10000, 16000,10000, 16000,10000, 16000,10000, 16000,
]);
/** 新增件數 */
const addCount = ref([
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
]);

/** 上月留下＋本月新增 - 本月成案 */
const placeholder3 = computed(() => lastMonth.value.map((data, index) => data + thisMonth.value[index] - thisMonthComplete.value[index]));
/** 上月留下+本月新增 - 本月成案 - 本月取消 */
const Placeholder4 = computed(() => placeholder3.value.map((data, index) => data - thisMonthCancel.value[index]));

const option = {
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
            return tar && `${tar.name}<br/>${tar.seriesName}:${tar.value.toLocaleString()}`;
        },
    },
    grid: {
        top: 30,
        left: 10,
        right: 10,
        bottom: 0,
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            name: "月份",
            data: (function () {
                let list = [];
                for (let i = 1; i <= 12; i++) {
                    list.push(`${i}月`);
                }
                return list;
            })(),
            // 第二條 x 軸，可以往上或往下偏移
            position: "bottom",
            offset: 18,
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
            name: "筆數",
            nameLocation: "end",
            nameGap: 20,
            nameTextStyle: {
                fontSize: 10,
            },
            position: "bottom",
            data: addCount.value,
            axisTick: {
                show: false, // 不顯示刻度線
            },
            axisLabel: {
                interval: 0,
                align: "center",
                formatter: (value, index) => {
                    const colorIndex = index % 4;
                    return `{color${colorIndex}|${value}}`;
                },
                rich: {
                    color0: {
                        fontSize: 11,
                        color: colorDeepBlue,
                    },
                    color1: {
                        fontSize: 11,
                        color: colorBlue,
                    },
                    color2: {
                        fontSize: 11,
                        color: colorYellow,
                    },
                    color3: {
                        fontSize: 11,
                        color: colorGray,
                    },
                },
            },
        },
    ],
    yAxis: {
        type: "value",
        name: "金額",
        nameTextStyle: {
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
    series: [
        {
            name: "上月留下",
            type: "bar",
            label: {
                show: true,
                position: "top",
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString();
                    return params.value === 0 ? "" : `+${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: colorDeepBlue,
            },
            data: lastMonth.value,
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
            data: lastMonth.value,
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
                    return params.value === 0 ? "" : `+${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: colorBlue,
            },
            data: thisMonth.value,
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
            data: placeholder3.value,
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
                    return params.value === 0 ? "" : `-${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: colorYellow,
            },
            data: thisMonthComplete.value,
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
            data: Placeholder4.value,
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
                    return params.value === 0 ? "" : `-${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: colorGray,
            },
            data: thisMonthCancel.value,
        },
    ],
};

const getMonthInfo = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/month-info`, {
            params: {
                year: formateYear.value,
            },
        });
        if (res.data.code === 1000) {
            lastMonth.value = res.data.result.lastMonth;
            thisMonth.value = res.data.result.thisMonth;
            thisMonthCancel.value = res.data.result.thisMonthCancel;
            thisMonthComplete.value = res.data.result.thisMonthComplete;
            addCount.value = res.data.result.addCount;
        }
        console.log(res.data.result);
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getMonthInfo();
watch(formateYear, () => getMonthInfo());
watch(
    [
        lastMonth, thisMonth, thisMonthComplete, thisMonthCancel, placeholder3, Placeholder4, addCount,
    ],
    ([
        newLastMonth, newThisMonth, newthisMonthComplete, newThisMonthCancel, newPlaceholder3, newPlaceholder4, newAddCount,
    ]) => {
        if (chart) {
            chart.setOption({
                xAxis: [
                    {
                        data: (function () {
                            let list = [];
                            for (let i = 1; i <= 12; i++) {
                                list.push(`${i}月`);
                            }
                            return list;
                        })(),
                    },
                    {
                        data: newAddCount,
                    },
                ],
                series: [
                    { data: newLastMonth },
                    { data: newLastMonth },
                    { data: newThisMonth },
                    { data: newPlaceholder3 },
                    { data: newthisMonthComplete },
                    { data: newPlaceholder4 },
                    { data: newThisMonthCancel },
                ],
            });
        }
    },
    { deep: true },
);

onMounted(() => {
    chart = echarts.init(waterfallContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart__waterfall {
    height: calc(100% - 32px);

    &__container {
        width: 100%;
        height: 100%
    }
}

</style>
