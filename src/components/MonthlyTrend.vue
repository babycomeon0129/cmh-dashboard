<template>
    <div class="monthlyTrend card">
        <div class="monthlyTrend__detail">
            <img src="@img/icon_general.svg" />
            <el-segmented
                v-model="trigger"
                :options="options"
                :class="{
                    'monthlyTrend__detail--type': trigger === '成案'
                }"
            />
            <div>{{ showRemark }}</div>
            <div class="monthlyTrend__legend">
                <div
                    v-for=" legend in legendList"
                    :key="legend">
                    {{ legend }}
                </div>
            </div>
        </div>
        <KeepAlive>
            <transition
                name="fade"
                mode="out-in"
            >
                <component :is="componentChange" />
            </transition>
        </KeepAlive>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MonthlyColumnChart from "@/components/chart/MonthlyColumnChart.vue";
import WaterFallChart from "@/components/chart/WaterFallChart.vue";

const trigger = ref("成案");
const options = [
    "成案", "預案",
];
const preProjectList = [
    "上月留下", "本月新增", "本月成案", "本月取消",
];
const projectList = [
    "成案", "毛利率",
];
const legendList = computed(() => trigger.value === "成案" ? projectList : preProjectList);
const componentChange = computed(() => trigger.value === "成案" ? MonthlyColumnChart : WaterFallChart);
const showRemark = computed(() => trigger.value === "成案" ? "月新增成案" : "月預案變化");
</script>

<style lang="scss" scoped>
.monthlyTrend  {
    height: calc(100% - 15px);
    min-height: 190px;
    margin-top: 15px;

    @media (max-width: 1500px) {
        height: calc(100% - 10px);
        margin-top: 10px;
    }

    &__detail {
        display: flex;
        align-items: center;
        width: 100%;

        img {
            margin-right: 10px;

            @media (max-width: 1500px) {
                width: 22px;

            }
        }
    }

    &__legend {
        display: flex;
        margin-left: 150px;
        font-size: 0.7rem;
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

                @media (max-width: 1500px) {
                    width: 6px;
                    height: 6px;
                }
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
    font-size: 1rem;

    @media (max-width: 1500px) {
        min-height: 16px;
    }

    &.monthlyTrend__detail--type {
        --el-segmented-item-selected-bg-color: var(--color-yellow);
    }

    .el-segmented__item {
        padding: 2px 22px;

        @media (max-width: 1500px) {
            padding: 2px 14px;
        }
    }
}

</style>
