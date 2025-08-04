<template>
    <div class="page-test">
        <HomeHeader />
        <YearIncome />
        <div class="page-test__charts">
            <ProjectComplete class="page-test__charts--a" />
            <ProjectPlan class="page-test__charts--b" />
            <MonthlyTrend class="page-test__charts--c" />
            <RowChart class="page-test__charts--d" />
        </div>
    </div>
</template>

<script setup>
import HomeHeader from "@/components/common/HomeHeader.vue";
import YearIncome from "@/components/YearIncome.vue";
import ProjectComplete from "@/components/ProjectComplete.vue";
import ProjectPlan from "@/components/ProjectPlan.vue";
import MonthlyTrend from "@/components/MonthlyTrend.vue";
import RowChart from "@/components/chart/RowChart.vue";
</script>

<style lang="scss" scoped>

.page-test {
    display: grid;
    grid-template-columns: auto;
    column-gap: 10px;
    width: 100%;
    height: 100vh;
    padding: 15px;
    overflow: hidden;

    @media (max-width: 1500px) {
        padding: 10px;
    }
}

.page-test__charts {
  display: grid;
  /* 2 個等寬主欄 + 1 個窄側欄 */
  grid-template-columns: 40% 40% 20%;
  /* 2 列 (你可用固定高或 auto) */
  grid-template-rows: calc(100% - 190px) 190px;
  /* 命名版位方便閱讀 */
  grid-template-areas:
    "a b d"
    "c c d";
  gap: 10px;
  width: calc(100% - 25px);
  height: calc(100vh - 32px - 74px - 60px);

  &--a {
      grid-area: a;
  }

  &--b {
      grid-area: b;
  }

  &--c {
      grid-area: c;
  }

  &--d {
      grid-area: d;
  }
}

</style>
