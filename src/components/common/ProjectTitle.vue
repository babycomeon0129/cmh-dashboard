<template>
    <div class="project__title">
        <div
            class="project__type"
            :class="{plan: type === 1}"
        >
            {{ type === 1 ? "預" : "成" }}
        </div>
        <div class="project__type2">{{  type === 1 ? "預" : "成" }}案</div>
        <div class="detail">共計
            <span>NTD {{ money }}</span>，<span>{{ count }}</span>筆，毛利率 <span>{{grossMargin}}%</span>，達成率 <span>{{achievement}}%</span>
        </div>
    </div>
</template>

<script setup>
const { type, money,count, grossMargin, achievement } = defineProps([
    "type", "money", "count", "grossMargin", "achievement",
]);
</script>

<style lang="scss" scoped>

.project__title {
    display: flex;
    align-items: center;
}

.project__type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-right: 12px;
    border-radius: 100%;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background: var(--color-yellow);

    &.plan {
        background: var(--color-deep-blue);
    }
}

.project__type2 {
    margin-right: 6px;
    font-size: 20px;
    color: var(--main-text-color);
}

.detail {
    font-size: 14px;
    color: var(--text-color2);

    span {
        font-size: 20px;
        font-weight: bold;
        color: var(--color-deep-blue);
    }
}
</style>
