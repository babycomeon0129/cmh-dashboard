<template>
    <div class="login">
        <div class="login__wrapper">
            <div class="login__img" />
            <div class="login__container">
                <h1>ERP2.0 dashboard</h1>
                <el-form
                    :model="form"
                    label-width="auto"
                    class="login__form"
                >
                    <el-form-item>
                        <el-input
                            v-model="form.userName"
                            :prefix-icon="User"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            v-model="form.password"
                            :prefix-icon="Lock"
                        />
                    </el-form-item>
                    <div class="tips">您輸入的用戶名或密碼有誤，請重新輸入</div>
                    <el-button type="primary">登錄</el-button>
                </el-form>
            </div>
        </div>
        <div class="copyright">Copyright 2024 cmh. com.tw All Rights Reserved.</div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";

const form = reactive({
    userName: "",
    password: "",
});
</script>

<style lang="scss" scoped>
@use "@style/login";
</style>
