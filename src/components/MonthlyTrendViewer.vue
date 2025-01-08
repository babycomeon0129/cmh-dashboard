<template>
    <div class="dashboard__box MonthlyTrendViewer">
        <div class="MonthlyTrendViewer__detail">
            <img src="@img/icon_general.svg" />
            <el-segmented
                v-model="trigger"
                :options="options"
            />
            <div>月預案變化</div>
            <div class="MonthlyTrendViewer__legend">
                <div
                    v-for=" legend in legendList"
                    :key="legend">
                    {{ legend }}
                </div>
            </div>
        </div>
        <component :is="WaterFallChart" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import WaterFallChart from "@/components/chart/WaterFallChart.vue";

const trigger = ref("成案");
const options = [
    "成案", "預案",
];

const legendList = [
    "上月留下", "本月新增", "本月成案", "本月取消",
];
</script>

<style lang="scss" scoped>
.MonthlyTrendViewer {
    height: calc(100% - 15px);
    min-height: 190px;
    margin-top: 15px;

    &__detail {
        display: flex;
        align-items: center;
        width: 100%;

        img {
            margin-right: 10px;
        }
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
                background: var(--color-gray);
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
