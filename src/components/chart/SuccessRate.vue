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
        flex-shrink: 0;
        margin-right: 10px;
        font-size: 0.7rem;
        color: var(--text-color3);
    }

    &__bar {
        width: 100%;
    }
}

:deep(.el-progress__text) {
    min-width: 20px;
    font-size: 0.86rem !important;
}

:deep(.el-progress-bar__outer) {
	height: 12px !important;

	@media (max-width: 1500px) {
		height: 8px !important;
	}
}
</style>
