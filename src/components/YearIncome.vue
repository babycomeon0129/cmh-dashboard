<template>
    <div class="dashboard__box year">
        <div class="year__title">
            2024
            <span>年度收入</span>
        </div>
        <div class="year__content">
            <div class="year__detail">
                <div>預案  <span>NTD</span> 400,000</div>
                <div>成案  <span>NTD</span> 600,000</div>
                <div>年度KPI  <span>NTD</span> 1,200,000</div>
            </div>
            <div class="progress">
                <el-progress
                    :text-inside="true"
                    :stroke-width="14"
                    :percentage="30"
                    :color="colorBlue"
                    class="bar plan"
                />
                <el-progress
                    :text-inside="true"
                    :stroke-width="14"
                    :percentage="90"
                    :color="colorYellow"
                    class="bar complete"
                >
                    <span>60%</span>
                </el-progress>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";

const { colorBlue, colorYellow } = useDashboardStore();

</script>

<style lang="scss" scoped>

.year {
    display: flex;
    margin-top: 11px;
    padding: 15px 20px 16px 29px;
}
.year__title {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 29px;
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
    color: var(--main-text-color);

    span {
        font-size: 14px;
    }
}

.year__content {
    width: 100%;
}

.year__detail {
    display: flex;
    justify-content: space-between;
    line-height: 24px;
    margin-bottom: 5px;
    color: var(--text-color);

    div {
		font-size: 14px;
		font-weight: bold;
    }

    span {
        font-size: 12px;
        font-weight: normal;
    }
}

.progress {
    position: relative;
    display: flex;
    width: 100%;
}

.bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    &.plan {
        z-index: 2;

        :deep(.el-progress-bar__outer) {
            background-color: transparent;
        }
    }

    &.complete {
        z-index: 1;
        //transform: translateY(-14px);
    }
}

</style>
