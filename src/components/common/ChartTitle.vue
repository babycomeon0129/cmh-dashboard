<template>
    <div
        class="chartTitle"
        :class="{plan: type === 1}"
    >
        {{ title }}
    </div>
</template>

<script setup>
const { title, type } = defineProps([
    "title", "type",
]);
</script>

<style lang="scss" scoped>
.chartTitle {
    position: relative;
    padding-left: 8px;
    font-size: 14px;
    color: var(--title-color);

    &::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 0;
        width: 3px;
        height: 14px;
        border-radius: 10px;
        background: var(--color-yellow);
    }

    &.plan::before {
      background: var(--color-deep-blue);
    }
}
</style>
