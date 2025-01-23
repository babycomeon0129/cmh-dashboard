<template>
    <div class="dashboard__box chart__row">
        <div class="chart__row__title">
            <div class="title">
                催收進展
            </div>
            <div class="chart__row__detail">
                共計<span>NTD {{ totalAmount.toLocaleString() }}</span>
            </div>
        </div>
        <div class="chart__row__detail">
            已開發票<span>{{ invoiceRate.toFixed(2) }}%</span>，已收回款項<span>{{ actualRate.toFixed(2) }}%</span>
        </div>
        <div class="chart__row__legend">
            <div
                v-for="legend in legendList"
                :key="legend"
            >
                {{ legend }}
            </div>
        </div>
        <div
            ref="rowContainer"
            class="chart__row__container"
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
const { formateYear } = storeToRefs(useDashboardStore());
const rowContainer = ref(null);
let chart = null;
/** 面板說明清單 */
const legendList = [
    "已開發票金額", "已沖帳", "本月實收金額",
];
/**已開發票比例*/
const invoiceRate = ref(50);
/** 已收回款項比例 */
const actualRate = ref(25);
/** 總金額 */
const totalAmount = ref(6000000);

/** 已開發票 */
const amountInvoice = ref([
    130000, 110000, 50000, 70000, 80000, 85436, 108000, 88000, 90000, 70000, 80000, 135436,
]);
/** 已沖帳 */
const amountRush = ref([
    0, 110000, 30000, 50000, 70000, 35436, 100000, 80000, 30000, 50000, 70000, 23536,
]);
/** 本月實收 */
const amountIncome = ref([
    24354, 23424, 35334, 50000, 43354, 23424, 35234, 50000, 22354, 23424, 35334, 50000,
]);
/** 已沖帳 左邊padding用 */
const toolCount = computed((() => {
    const maxVal = Math.max(...amountInvoice.value);
    const percentage = innerWidth > 1500 ? 0.01 : 0.02;
    const toolVal = maxVal * percentage;
    return new Array(12).fill(toolVal);
    //return amountInvoice.value.map(data => data * 0.01);
}));

const option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        top: 0,
        right: 75,
        left: 0,
        bottom: 0,
        containLabel: true,
    },
    xAxis: {
        type: "value",
        position: "top",
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: {
            show: false,
        },
    },
    yAxis: [
        {
            type: "category",
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: {
                fontSize: innerWidth > 1500 ? 14 : 9,
            },
            data: Array.from({ length: 12 }, (_, i) => `${12 - i}月`),

        },
        {
            type: "category",
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            data: Array.from({ length: 12 }, (_, i) => `${12 - i}月`),
        },
    ],
    series: [
        {
            name: "已開發票金額",
            type: "bar",
            z: 2,
            label: {
                show: true,
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString("en-US");
                    return formattedValue;
                },
                position: "right",
                color: "#0098FA",
                fontSize: 9,
            },
            itemStyle: {
                color: "rgba(255, 255, 255, 0)", // 完全透明
                borderRadius: [
                    50, 50, 50, 50,
                ],
                borderWidth: 1,
                borderColor: "#0098FA",
            },
            barWidth: innerWidth > 1500 ? "14px" : "12px",
            data: amountInvoice.value,
        },
        {
            name: "已沖帳工具",
            stack: "incomeStack",
            type: "bar",
            z: 2, // 在上方
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            label: {
                show: false,
            },
            itemStyle: {
                color: "transparent",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            barWidth: innerWidth > 1500 ? "10px" : "8px",
            data: toolCount.value,
        },
        {
            name: "已冲帳",
            stack: "incomeStack",
            type: "bar",
            z: 2, // 在上方
            label: {
                show: true,
                position: "inside",
                formatter: (params) => {
                    const formattedValue = (amountRush.value[params.dataIndex] / amountInvoice.value[params.dataIndex]) * 100 ;
                    return formattedValue ? `${formattedValue.toFixed(0)}%` : "";
                },
                fontSize: 6,
            },
            itemStyle: {
                color: "#0098FA",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            barWidth: 10,
            barGap: innerWidth > 1500 ? "-85%" : "-83%",
            data: amountRush.value.map((data, index) => {
                const res = data - toolCount.value[index] * 2;
                const percentage = (amountRush.value[index] / amountInvoice.value[index]) * 100;

                return {
                    value: data === 0 ? 0 : res,
                    label: {
                        position: percentage > 50 ? "inside" : "right",
                        color: percentage > 50 ? "#fff" : "#0098FA",
                    },
                };
            }),
        },
        {
            name: "工具",
            type: "bar",
            yAxisIndex: 1,
            z: 3, // 在上方
            itemStyle: {
                color: "transparent",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            tooltip: {
                show: false, // 禁用滑鼠懸停提示
            },
            barWidth: "2px", // 保持宽度一致
            data: amountIncome.value,
        },
        {
            name: "本月實收金額",
            type: "bar",
            yAxisIndex: 1,
            z: 3, // 在上方
            label: {
                show: true,
                formatter: (params) => {
                    const formattedValue = params.value.toLocaleString("en-US");
                    return formattedValue;
                },
                position: "right",
                color: "#F99606",
                fontSize: 9,
            },
            itemStyle: {
                color: "#F99606",
                borderRadius: [
                    50, 50, 50, 50,
                ],
            },
            barWidth: innerWidth > 1500 ? 14 : 12,
            barGap: innerWidth > 1500 ? 20 : 15,
            data: amountIncome.value,
        },
    ],
};

const getNonAccrual = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/non-accrual`, {
            params: {
                year: formateYear.value,
            },
        });

        if (res.data.code === 1000) {
            amountInvoice.value = res.data.result.amountInvoice;
            amountRush.value = res.data.result.amountRush;
            amountIncome.value = res.data.result.amountIncome;
            totalAmount.value = res.data.result.totalAmount;
            invoiceRate.value = res.data.result.invoiceRate;
            actualRate.value = res.data.result.actualRate;
        }

        console.log(res.data);
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getNonAccrual();

watch(formateYear, () => route.name !== "test" && getNonAccrual());

watch(
    [
        () => amountInvoice, () => amountRush, () => amountIncome, () => toolCount,
    ],
    ([
        newAmountInvoice, newAmountRush, newAmountIncome, newToolCount,
    ]) => {
        if (chart) {
            chart.setOption({
                series: [
                    {
                        data: newAmountInvoice.value.map(value => ({
                            value,
                            itemStyle: {
                                borderWidth: value === 0 ? 0 : 1, // 動態設定 borderWidth
                                borderColor: value === 0 ? "transparent" : "#0098FA", // 當數值為 0 時隱藏邊框
                            },
                        })),
                    },
                    {
                        data: newToolCount.value,
                    },
                    {
                        data: newAmountRush.value.map((data, index) => {
                            const res = data - toolCount.value[index] * 2;
                            const percentage = (amountRush.value[index] / amountInvoice.value[index]) * 100;

                            return {
                                value: data === 0 ? 0 : res,
                                label: {
                                    position: percentage > 50 ? "inside" : "right",
                                    color: percentage > 50 ? "#fff" : "#0098FA",
                                },
                            };
                        }),
                    },
                    {
                        data: newAmountIncome.value,
                    },
                    {
                        data: newAmountIncome.value,
                    },
                ],
            });
        }
    },
    { deep: true },
);

onMounted(() => {
    chart = echarts.init(rowContainer.value);
    chart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart__row {
    width: 100%;
    margin-left: 15px;

    @media (max-width: 1500px) {
        margin-left: 10px;
    }

    &__title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 1.43rem;
        color: var(--main-text-color);

        .title {
            margin-right: 12px;

            @media (max-width: 1500px) {
                margin-right: 2px;
            }
        }
    }

	&__legend {
		display: flex;
		flex-wrap: wrap;
    margin-top: 15px;
    font-size: 0.785rem;

    @media (max-width: 1500px)  {
            margin-top: 8px;
        }

		div {
			position: relative;
			display: flex;
			align-items: center;
			margin-right: 20px;

			&::before {
                content: "";
				display: block;
				width: 8px;
				height: 8px;
				margin-right: 5px;
				background:#0098FA;

				@media (max-width: 1500px) {
					width: 6px;
					height: 6px;
				}
			}

            &:first-child::before {
                border: 1px solid #0098FA;
                background: #fff;
            }

            &:last-child::before {
                background: #F99606;
            }
		}
	}

    &__container {
        width: 100%;
        height: calc(100% - 90px);
    }

    &__detail {
        display: flex;
        align-items: baseline;
        font-size: 1rem;
        color: var(--text-color2);

        span {
            font-size: 1.43rem;
            font-weight: bold;
            color: var(--color-deep-blue);
        }
    }
}
</style>
