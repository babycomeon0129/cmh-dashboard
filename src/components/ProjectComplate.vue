<template>
    <div class="dashboard__box project__box ">
        <ProjectTitle
            :type="2"
            :money="400000"
            :count="10"
            :gross-margin="45"
            :achievement="64"
        />
        <div class="charts">
            <ColumnChart
                :gross-profit="colGrossProfit"
                :col-data="colData"
            />
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectTitle from "@/components/common/ProjectTitle.vue";
import ColumnChart from "@/components/chart/ColumnChart.vue";

const colGrossProfit = ref([
    20, 40, 70, 50,
]);

const colData = ref([
    1853794, 1817660, 1433037, 31236841,
]);
</script>

<style lang="scss" scoped>

.charts {
    margin-top: 15px;
}
</style>
