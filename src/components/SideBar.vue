<template>
    <aside>
        <div class="logo">
            <img src="@img/logo_bw.svg" />
        </div>
    </aside>
</template>

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
    text-align: center;
}
</style>
