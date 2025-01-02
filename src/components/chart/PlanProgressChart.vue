<template>
    <div class="chart chart__progress__complate">
        <ChartTitle
            title="預案進展"
            :type="1"
        />
        <div class="chart__progress__complate__content">
            <el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="percentage(0)"
                :color="colorBlue"
                class="bar bar__1"
            />
            <el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="percentage(0) + percentage(1)"
                :color="colorYellow"
                class="bar bar__2"
            >
                <span>{{ percentage(1) }}%</span>
            </el-progress>
            <el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="percentage(0) + percentage(1) + percentage(2)"
                :color="colorRed"
                class="bar bar__3"
            >
                <span>{{ percentage(2) }}%</span>
            </el-progress>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ChartTitle from "@/components/common/ChartTitle.vue";
import { useDashboardStore } from "@/stores/dashboard";

const { colorBlue, colorYellow, colorRed } = useDashboardStore();
/** 成案進展 */
const progressData = ref([
    100000, 120000, 180000,
]);
const progressDataTotal = computed(() => progressData.value[0] + progressData.value[1] + progressData.value[2]);

const percentage = (index) => (progressData.value[index] / progressDataTotal.value) * 100;

console.log(percentage(0));
</script>

<style lang="scss" scoped>
.chart__progress__complate {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 57%;
    aspect-ratio: 2.7;
    margin-top: 15px;

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
}

.bar {
    :deep(.el-progress-bar__outer) {
        background-color: transparent;
    }

    &__1 {
        z-index: 2;
        transform: translateY(18px);

        :deep(.el-progress-bar__inner) {
          border-radius: 100px 0 0 100px;
        }
    }

	&__2 {
        z-index: 1;

        :deep(.el-progress-bar__inner) {
          border-radius: 100px 0 0 100px;
        }
    }

	&__3 {
        z-index: 0;
		transform: translateY(-18px);
    }
}
</style>
