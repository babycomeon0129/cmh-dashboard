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
            <span>NTD {{ totalAmount.toLocaleString() }}</span>，<span>{{ totalCount }}</span>筆，毛利率 <span>{{grossMargin.toFixed(2)}}%</span>，{{ type === 1 ? "成案": "達成" }}率 <span>{{confirmRate.toFixed(2)}}%</span>
        </div>
    </div>
</template>

<script setup>
const { type, totalAmount, totalCount, grossMargin, confirmRate } = defineProps([
    "type", "totalAmount", "totalCount", "grossMargin", "confirmRate",
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
    font-size: 1.29rem;
    font-weight: bold;
    color: #fff;
    background: var(--color-yellow);

    @media (max-width: 1500px) {
        width: 25px;
        height: 25px;
        margin-right: 3px;
        font-size: 0.93rem;
    }

    &.plan {
        background: var(--color-deep-blue);
    }
}

.project__type2 {
    margin-right: 6px;
    font-size: 1.43rem;
    color: var(--main-text-color);
}

.detail {
    font-size: 1rem;
    color: var(--text-color2);

    span {
        font-size: 1.43rem;
        font-weight: bold;
        color: var(--color-deep-blue);
    }
}
</style>
