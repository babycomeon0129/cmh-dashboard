<template>
    <div class="dashboard__box chart__waterfall">
        <div class="chart__waterfall__detail">
            <img src="@img/icon_general.svg" />
            <el-segmented
                v-model="trigger"
                :options="options"
            />
            <div>月預案變化</div>
            <div class="chart__waterfall__legend">
                <div
                    v-for=" legend in legendList"
                    :key="legend">
                    {{ legend }}
                </div>
            </div>
        </div>
        <div
            ref="waterfallContainer"
            class="chart__waterfall__container"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import * as echarts from "echarts";

const trigger = ref("成案");
const options = [
    "成案", "預案",
];
const waterfallContainer = ref(null);
const legendList = [
    "上月留下", "本月新增", "本月成案", "本月取消",
];
/** 上月留下 */
const lastMonth = ref([
    48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000, 48000, 44000,
]);
/** 本月新增 */
const thisMonth = ref([
    32000, 30000, 32000, 30000,32000, 30000,32000, 30000,32000, 30000,32000, 30000,
]);
/** 本月成案 */
const thisMonthComplate = ref([
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
const placeholder3 = computed(() => lastMonth.value.map((data, index) => data + thisMonth.value[index] - thisMonthComplate.value[index]));
/** 上月留下+本月新增 - 本月成案 - 本月取消 */
const Placeholder4 = computed(() => placeholder3.value.map((data, index) => data - thisMonthCancel.value[index]));

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
    // legend: {
    //     data: [
    //         "上月留下", "本月新增", "本月成案", "本月取消",
    //     ],
    // },
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
            data: (function () {
                let list = [];
                for (let i = 1; i <= 12; i++) {
                    list.push(`${i}月`);
                }
                return list;
            })(),
            // 第二條 x 軸，可以往上或往下偏移
            position: "bottom",
            offset: 20,
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
                return addCount.value;
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
                    return `+${formattedValue}`;

                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#4CA8FF",
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
                    return `-${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#EFAB29",
            },
            data: thisMonthComplate.value,
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
                    return `- ${formattedValue}`;
                },
                textStyle: {
                    fontSize: 8,
                },
            },
            itemStyle: {
                color: "#C5C7CC",
            },
            data: thisMonthCancel.value,
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
    height: calc(100% - 35px);
    min-height: 181px;
    margin-top: 15px;

    &__detail {
        display: flex;
        align-items: center;
        width: 100%;

        img {
            margin-right: 10px;
        }
    }

    &__container {
        width: 100%;
        height: calc(100% - 32px)
    }

    &__legend {
        display: flex;
        margin-left: 150px;
        font-size: 10px;
        color: var(--text-color);

        div {
            display: flex;
            align-items: center;
            margin-right: 20px;

            &::before {
                content: "";
                display: block;
                width: 8px;
                height: 8px;
                margin-right: 5px;
                background: var(--color-deep-blue);
            }

            &:nth-child(2)::before {
                background: var(--color-blue);
            }

            &:nth-child(3)::before {
                background: var(--color-yellow);
            }

            &:nth-child(4)::before {
                background: #C5C7CC;
            }
        }
    }
}

:deep(.el-segmented) {
    --el-segmented-item-selected-bg-color: var(--color-deep-blue);
    --el-segmented-bg-color: #fff;
    margin-right: 10px;
    padding: 0;
    border: 1px solid var(--border-color);
    font-size: 14px;

    .el-segmented__item {
        padding: 2px 22px;
    }
}

</style>
