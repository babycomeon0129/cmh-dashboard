<template>
    <aside>
        <ul>
            <li class="logo"><img src="@img/logo_bw.svg" /></li>
            <li>
                <el-icon :size="size">
                    <Platform />
                </el-icon>
                專案看板
            </li>
            <li>
                <el-icon :size="size">
                    <TrendCharts />
                </el-icon>
                專案管理
            </li>
        </ul>
    </aside>
</template>

<script setup>
const size = 30;

</script>

<style lang="scss" scoped>
aside {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--side-width);
    padding: 20px 0;
    color: #fff;
    background: var(--main-bg-color);
    height: 100vh;
}

.logo {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;
}

li:not(.logo) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
}

</style>
