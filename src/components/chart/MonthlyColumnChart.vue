<template>
    <div class="chart__MonthlyColumn">
        <div
            ref="monthlyColContainer"
            class="chart__MonthlyColumn__container"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import * as echarts from "echarts";
import axios from "axios";

const route = useRoute();
const { colorYellow, colorPurple } = useDashboardStore();
const monthlyColContainer = ref(null);
let chart = null;

/** 服務成案比例-毛利率 */
const grossProfit = ref([
    20, 40, 70, 50, 20, 40, 70, 50, 20, 0, 70, 50,
]);
/** 服務成案比例-金額 */
const colData = ref([
    26000, 29000, 41000, 60000, 26000, 41000, 60000, 60000, 26000, 0 , 26000, 29000,
]);
/** 服務成案比例-筆數 */
const serviceCount = ref([
    "8筆","9筆", "13筆", "30筆", "8筆","9筆", "13筆", "30筆", "8筆", "0筆", "13筆", "30筆",
]);

const option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
        },
    },
    grid: {
        top: 30,
        left: 10,
        right: 10,
        bottom: 3,
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            name: "筆數",
            nameLocation: "end",
            nameGap: 20,
            nameTextStyle: {
                fontSize: 10,
            },
            position: "bottom",
            data: serviceCount.value,
            axisTick: {
                show: false, // 不顯示刻度線
            },
            axisLabel: {
                interval: 0,
                align: "center",
                formatter: (value, index) => `{color|${value}}\n${index + 1}月`,
                rich: {
                    color: {
                        fontSize: 12,
                        lineHeight: 16,
                        color: colorYellow,
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
    series: [
        {
            name: "金額",
            yAxisIndex: 1, // 將指向 y 軸的 index 調整為0 （因為只有兩個 y 軸了）
            type: "bar",
            barWidth: "30%",
            itemStyle: {
                color: colorYellow,
            },
            label: {
                show: true,
                position: "top", // 可視情況改成 'top', 'inside', 'insideBottom'等
                formatter: (params) => params.value !== 0 ? params.value.toLocaleString() : "",
                color: "#000",
                fontSize: 9,
            },
            data: colData.value,
        },
        {
            name: "毛利率",
            type: "line",
            yAxisIndex: 0, // 將指向 y 軸的 index 調整為0 （因為只有兩個 y 軸了）
            itemStyle: {
                color: colorPurple,
            },
            label: {
                show: false,
                position: "top", // 可視情況改成 'top', 'inside', 'insideBottom'等
                formatter: "{c}%",
                color: "#000",
                fontSize: 8,
            },
            data: grossProfit.value,
        },
    ],
};

const getmonthConfirm = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/month-confirm`, {
            params: {
                year: 2024,
            },
        });

        if (res.data.code === 1000) {
            colData.value = res.data.result.colData;
            console.log(colData.value);
            console.log(res.data.result.colData);
            grossProfit.value = res.data.result.colGrossProfit;
            serviceCount.value = res.data.result.serviceCount;
        }

        // console.log(res.data.result.colData);
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getmonthConfirm();

watch(
    [
        () => colData, () => grossProfit, () => serviceCount,
    ],
    ([
        newColData, newGrossProfit, newServiceCount,
    ]) => {
        if (chart) {
            chart.setOption({
                xAxis: [
                    {
                        data: newServiceCount.value, // 更新 x 軸數據
                    },
                ],
                series: [
                    {
                        data: newColData.value, // 更新金額數據
                    },
                    {
                        data: newGrossProfit.value, // 更新毛利率數據
                    },
                ],
            });
        }
    },
    { deep: true },
);

onMounted(() => {
    chart = echarts.init(monthlyColContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart__MonthlyColumn {
    height: calc(100% - 32px);

    &__container {
        width: 100%;
        height: 100%
    }
}

</style>
