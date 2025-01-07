<template>
    <div class="dashboard__box year">
        <div class="year__title">
            2024
            <span>年度收入</span>
        </div>
        <div class="year__content">
            <div class="year__detail">
                <div>成案  <span>NTD</span> {{ completeCount.toLocaleString()}}</div>
                <div>預案  <span>NTD</span> {{ planCount.toLocaleString()}} </div>
                <div>年度KPI  <span>NTD</span> {{ kpiCount.toLocaleString() }}</div>
            </div>
            <div class="progress">
                <el-progress
                    :text-inside="true"
                    :stroke-width="14"
                    :percentage="completePercentage"
                    :color="colorYellow"
                    class="bar plan"
                />
                <el-progress
                    :text-inside="true"
                    :stroke-width="14"
                    :percentage="planPercentage + completePercentage"
                    :color="colorBlue"
                    class="bar complete"
                >
                    <span>{{ planPercentage }}%</span>
                </el-progress>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import axios from "axios";

const route = useRoute();
const { colorBlue, colorYellow } = useDashboardStore();

let planCount = ref(600000);
let completeCount = ref(400000);
let kpiCount = ref(1200000);

let planPercentage = computed(() => {
    const value = (planCount.value / kpiCount.value) * 100;
    return Number(value.toFixed(2));
});
let completePercentage = computed(() => {
    const value = (completeCount.value / kpiCount.value) * 100;
    return Number(value.toFixed(2));
});

const getTitleData = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/title`, {
            params: {
                year: 2024,
            },
        });
        if (res.data.code === 1000) {
            planCount.value = res.data.result.planCount;
            completeCount.value = res.data.result.completeCount;
            kpiCount.value = res.data.result.kpiCount;
        }
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getTitleData();
</script>

<style lang="scss" scoped>

.year {
    display: flex;
    height: 74px;
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

:deep(.el-progress-bar__inner) {
  font-size: 12px;
}

</style>
