<template>
    <div class="login">
        <div class="login__ui">
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
                                :prefix-icon="UserFilled"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                v-model="form.password"
                                :prefix-icon="Lock"
                                type="password"
                            />
                        </el-form-item>
                        <div
                            class="tips"
                        >
                            {{ showTips }}
                        </div>
                        <el-button
                            type="primary"
                            @click="getPermission"
                        >
                            登錄
                        </el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="copyright">Copyright 2024 cmh. com.tw All Rights Reserved.</div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import axios from "axios";

const router = useRouter();
const { isLogin } = storeToRefs(useDashboardStore());
const form = reactive({
    userName: "",
    password: "",
});

const showTips = ref("");

const getPermission = async () => {
    if (!form.userName || !form.password) {
        showTips.value = "用戶名或密碼不可為空";
        return;
    }

    try {
        let res = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/permission/get-permission`, {
            params: {
                employeeId: form.userName,
            },
        });

        if (res.data.code === 1000) {
            await login();
        } else {
            showTips.value = "您輸入的用戶名沒有登錄權限";
        }
    }
    catch (error) {
        console.log(error);
        showTips.value = "您輸入的用戶名沒有登錄權限";
    }
};

const login = async () => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_LOGIN_API}/login`, {
            username: form.userName,
            password: form.password,
            deviceId: 0,
        });

        if (res.data.code === 1000) {
            isLogin.value = true;
            router.push({ path: "/" });
        } else {
            showTips.value = "您輸入的用戶名或密碼有誤，請重新輸入";
        }
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
};

</script>

<style lang="scss" scoped>
@use "@style/login";
</style>
