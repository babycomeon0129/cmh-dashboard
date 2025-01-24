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
    width: 100%;
    padding-left: 8px;
    font-size: 1rem;
    color: var(--title-color);

    @media (max-width: 1500px) {
        padding-left: 7px;
    }

    &::before {
        content: "";
        position: absolute;
        top: 15%;
        left: 0;
        width: 3px;
        height: 70%;
        border-radius: 10px;
        background: var(--color-yellow);

        @media (max-width: 1500px) {
            width: 2px;
        }
    }

    &.plan::before {
		background: var(--color-deep-blue);
    }
}
</style>
