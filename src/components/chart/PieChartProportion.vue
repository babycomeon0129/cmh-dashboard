<template>
    <div class="chart chart__pie">
        <ChartTitle
            :title="`${titleType}案來源比例`"
            :type="type"
        />
        <div
            ref="pieContainer"
            class="chart__pie__container"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";

import * as echarts from "echarts";

const { amountRatio, type } = defineProps([
    "amountRatio", "type",
]);
const { colorYellow, colorBlue } = useDashboardStore();
const titleType = computed(() => type == 1 ? "預" : "成");
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
            radius: "70%",
            data: amountRatio,
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
                    fontSize: 10,
                },
            },
            color: [
                colorYellow ,colorBlue,
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
            radius: "70%",
            data: amountRatio,
            itemStyle: {
                borderColor: "#fff", // 分隔線的顏色，可依需求修改
                borderWidth: 5, // 分隔線的寬度，可依需求調整
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
    //height: 170px;
    aspect-ratio: 1.65;
    margin-top: 10px;
    margin-left: 10px;

    &__container {
        height: 100%;
    }
}
</style>
