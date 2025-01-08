<template>
    <div class="chart chart__successRate">
        <ChartTitle
            title="預案服務成案率"
            :type="1"
        />
        <div class="chart__successRate__container">
            <div
                v-for="(rate, index) in successRate"
                :key="rate.name"
                class="chart__successRate__list"
            >
                <div
                    v-html="rate.name"
                    class="chart__successRate__title" />
                <el-progress
                    :stroke-width="12"
                    :percentage="rate.rate"
                    :color="colors[index]"
                    class="chart__successRate__bar"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";

const { successRate } = defineProps([
    "successRate",
]);
const { colorYellow, colorBlue, colorGreen, colorRed } = useDashboardStore();

const colors = [
    colorYellow, colorBlue, colorGreen, colorRed,
];

</script>

<style lang="scss" scoped>
.chart__successRate {
    width: calc(40% - 5px);

    &__container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
    }

    &__list {
        display: flex;
        width: 100%;
    }

    &__title {
        width: 22.5%;
        flex-shrink: 0;
        font-size: 10px;
        color: var(--text-color3);
    }

    &__bar {
        width: 100%;
    }
}

:deep(.el-progress__text) {
    min-width: 20px;
    font-size: 12px !important;
}
</style>
