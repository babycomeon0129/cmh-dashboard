import { ref, computed } from "vue";
import { defineStore } from "pinia";
import moment from "moment";

export const useDashboardStore = defineStore("dashboard", () => {
    const isLogin = ref(false);
    const colorBlue = "#4CA8FF";
    const colorYellow = "#FFAE41";
    const colorGreen = "#4EC478";
    const colorRed = "#F97F6C";
    const colorPurple = "#D878B1";
    const colorDeepBlue = "#345EB4";
    const colorGray = "#C5C7CC";
    /** 更新時間 */
    const updateTime = ref("2024-11-05 14:50: 01");
    /** 是否顯示側邊欄 */
    const showSideBar = ref(false);
    /** 資料年份 */
    const year = ref(new Date());
    const formateYear = computed(() => moment(year.value).format("YYYY"));
    const openFullscreen = ref(false);

    return {
        isLogin,
        colorBlue,
        colorYellow,
        colorGreen,
        colorRed,
        colorPurple,
        colorDeepBlue,
        colorGray,
        updateTime,
        showSideBar,
        year,
        formateYear,
        openFullscreen,
    };
});
