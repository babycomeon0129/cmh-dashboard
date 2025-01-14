<template>
    <header>
        <div class="title">
            <h1>專案管理</h1>
            <div class="date">
                數據更新時間： {{ updateTime }}
            </div>
        </div>
        <div>
            <el-date-picker
                v-model="year"
                type="year"
                placeholder="Pick a year"
            />
        </div>
    </header>
</template>

<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";

const store = useDashboardStore();
const { updateTime, year } = storeToRefs(store);
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
}

h1 {
    margin: 0;
    font-size: 28px;
    line-height: 1;
}

.title {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.date {
    margin-left: 15px;
}
</style>
