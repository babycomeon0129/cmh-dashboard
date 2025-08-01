<template>
    <div class="progress-chart chart">
        <ChartTitle
            title="成案進展"
            :type="2"
        />
        <div class="progress-chart__legend">
            <div
                v-for="legend in progressData"
                :key="legend.name"
            >
                {{ legend.name }}
            </div>
        </div>
        <div class="progress-chart__content">
            <div class="progress-chart__total">
                <div
                    v-for="total in progressData"
                    :key="total.name"
                >
                    NTD {{ total.total.toLocaleString() }}
                </div>
            </div>
            <div class="progress-chart__bar-list">
                <el-progress
                    :text-inside="true"
                    :percentage="percentage(0)"
                    :color="colorBlue"
                    class="progress-chart__bar progress-chart__bar--blue"
                />
                <el-progress
                    :text-inside="true"
                    :percentage="percentage(0) + percentage(1)"
                    :color="colorYellow"
                    class="progress-chart__bar progress-chart__bar--yellow"
                >
                    <span>{{ percentage(1) }}%</span>
                </el-progress>
                <el-progress
                    :text-inside="true"
                    :percentage="percentage(0) + percentage(1) + percentage(2)"
                    :color="colorRed"
                    class="progress-chart__bar progress-chart__bar--red"
                >
                    <span>{{ percentage(2) }}%</span>
                </el-progress>
            </div>
            <div class="progress-chart__total">
                <div
                    v-for="count in progressData"
                    :key="count.name"
                >
                    {{ count.count.toLocaleString() }} 筆
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";

const { progressData } = defineProps([
    "progressData",
]);
const { colorBlue, colorYellow, colorRed } = useDashboardStore();

const progressDataTotal = computed(() => progressData[0].total + progressData[1].total + progressData[2].total);

const percentage = (index) => (progressData[index].total / progressDataTotal.value) * 100 || 0;

</script>

<style lang="scss" scoped>
.progress-chart {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: calc(60% - 5px);
    min-height: 143px;
    margin-top: 10px;

    @media (max-width: 1500px) {
        min-height: 130px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    &__legend {
        display: flex;
        margin-top: 15px;
        font-size: 0.714rem;

        @media (max-width: 1500px)  {
            margin-top: 8px;
        }

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
                background: var(--color-blue);
            }

            &:nth-child(2)::before {
                background: var(--color-yellow);
            }

            &:nth-child(3)::before {
                background: var(--color-red);
            }
        }
    }

    &__total {
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        color: var(--text-color3);

		@media (max-width: 1500px) {
			//
			font-size: 10px;
        }
    }

    &__bar-list {
        position: relative;
        width: 100%;
        height: 18px;
        margin: 5px 0;

        @media (max-width: 1500px) {
            height: 12px;
            margin: 3px 0;
        }
    }

    &__bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        :deep(.el-progress-bar__outer) {
            height: 18px !important;

            @media (max-width: 1500px) {
                height: 12px !important;
                font-size: 7px;
            }
        }

        &--blue {
            z-index: 2;

            :deep(.el-progress-bar__outer) {
                background-color: transparent;
            }

            :deep(.el-progress-bar__inner) {
                border-radius: 100px 0 0 100px;
            }
        }

      &--yellow {
            z-index: 1;

            :deep(.el-progress-bar__outer) {
                background-color: transparent;
            }

            :deep(.el-progress-bar__inner) {
              border-radius: 100px 0 0 100px;
            }
        }

      &--red {
            z-index: 0;
        }
    }
}

:deep(.el-progress-bar__innerText) {
    font-size: 10px;
}
</style>
