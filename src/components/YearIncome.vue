<template>
    <div class="year card">
        <div class="year__title">
            {{ formateYear }}
            <span>年度收入</span>
        </div>
        <div class="year__content">
            <div class="year__detail">
                <div>成案
                    <span>NTD</span>{{ completeCount.toLocaleString()}}（{{  completePercentage }}%）
                </div>
                <div>預案  <span>NTD</span> {{ planCount.toLocaleString()}}（{{  planPercentage }}%）</div>
                <div>年度KPI  <span>NTD</span> {{ kpiCount.toLocaleString() }}</div>
            </div>
            <div class="year__progress">
                <el-progress
                    :text-inside="true"
                    :percentage="completePercentage"
                    :color="colorYellow"
                    class="year__bar year__bar--plan"
                >
                    <span />
                </el-progress>
                <el-progress
                    :text-inside="true"
                    :percentage="planPercentage + completePercentage"
                    :color="colorBlue"
                    class="year__bar year__bar--complete"
                >
                    <span />
                </el-progress>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import axios from "axios";

const route = useRoute();
const { colorBlue, colorYellow } = useDashboardStore();
const { updateTime, formateYear } = storeToRefs(useDashboardStore());

let planCount = ref(600000);
let completeCount = ref(400000);
let kpiCount = ref(1200000);

let planPercentage = computed(() => {
    const value = (planCount.value / kpiCount.value) * 100;
    return Number(value.toFixed(2)) || 0;
});
let completePercentage = computed(() => {
    const value = (completeCount.value / kpiCount.value) * 100;
    return Number(value.toFixed(2)) || 0;
});

const getTitleData = async () => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/dashboard/title`, {
            params: {
                year: formateYear.value,
            },
        });
        if (res.data.code === 1000) {
            planCount.value = res.data.result.planCount || 0;
            completeCount.value = res.data.result.completeCount || 0;
            kpiCount.value = res.data.result.kpiCount || 0;
            updateTime.value = res.data.result.time;

        }
    }
    catch (error) {
        console.error(error);
    }
};

if (route.name !== "test") getTitleData();

watch(formateYear, () => route.name !== "test" && getTitleData());
</script>

<style lang="scss" scoped>

.year {
    display: flex;
    height: 74px;
    margin-top: 10px;
    padding: 15px 20px 16px 29px;

    @media (max-width: 1500px) {
        height: 50px;
        padding: 7px 20px 7px 14px;
    }
}
.year__title {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 29px;
    font-size: 1.43rem;
    font-weight: bold;
    line-height: 1.5;
    color: var(--main-text-color);

    span {
        font-size: 1rem;
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

    @media (max-width: 1500px) {
        margin-bottom: 4px;
    }

    div {
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;

        @media (max-width: 1500px) {
            height: 16px;
        }

        &::before {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 5px;
            background: var(--color-yellow);

            @media (max-width: 1500px) {
                width: 6px;
                height: 6px;
            }
        }

        &:nth-child(2)::before  {
            background: var(--color-blue);
        }

        &:nth-child(3)::before  {
            background: #ECECEC;
        }
    }

    span {
        margin: 0 5px 0 13px;
        font-size: 0.86rem;
        font-weight: normal;
    }
}

.year__progress {
    position: relative;
    display: flex;
    width: 100%;
}

.year__bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    &--plan {
        z-index: 2;

        :deep(.el-progress-bar__outer) {
            background-color: transparent;
        }
    }

    &--complete {
        z-index: 1;
    }
}

:deep(.el-progress-bar__inner) {
    font-size: 0.86rem;
}

:deep(.el-progress-bar__outer) {
    height: 14px !important;

    @media (max-width: 1500px) {
        height: 10px !important;
    }
}

</style>
