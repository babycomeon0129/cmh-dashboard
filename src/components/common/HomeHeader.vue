<template>
    <header>
        <div class="title">
            <h1>專案管理</h1>
            <div class="date">
                數據更新時間： {{ updateTime }}
            </div>
        </div>
        <div class="icons">
            <component
                :is="openFullscreen ? ZoomOut : ZoomIn"
                @click="openFullscreen  = !openFullscreen"
            />
            <div class="date-picker">
                <el-date-picker
                    v-model="year"
                    :clearable="false"
                    :disabled-date="disabledDate"
                    type="year"
                    placeholder="Pick a year"
                />
            </div>
        </div>
    </header>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { ZoomIn, ZoomOut } from "@element-plus/icons-vue";

const store = useDashboardStore();
const { updateTime, year, openFullscreen } = storeToRefs(store);

const disabledDate = (date) => {
    const currentYear = new Date().getFullYear();
    const selectedYear = date.getFullYear();
    return selectedYear < 2024 || selectedYear > currentYear;
};

</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;

    @media (max-width: 1500px) {
      height: 27px;
    }
}

h1 {
    margin: 0;
    font-size: 2rem;
    line-height: 1;
}

.title {
    display: flex;
    align-items: center;
    font-size: 1rem;
}

.icons {
    display: flex;
    align-items: center;

    svg {
        width: 14px;
        height: 14px;
        color: var(--text-color2);
    }
}

.date {
    margin-left: 15px;
}

:deep(.el-input) {
    width: 30px !important;
    border: none;
    cursor: pointer;
    --el-input-border-color: none;
    --el-input-bg-color: none;
    --el-input-focus-border: none;
    --el-input-hover-border: none;
    --el-input-focus-border-color: none;
    --el-input-hover-border-color: none;
    --el-input-placeholder-color: none;
    --el-input-clear-hover-color: none;

}
</style>
