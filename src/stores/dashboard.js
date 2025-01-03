//import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", () => {
    const colorBlue = "#4CA8FF";
    const colorYellow = "#FFAE41";
    const colorGreen = "#4EC478";
    const colorRed = "#F97F6C";
    const colorPurple = "#D878B1";
    const colorDeepBlue = "#345EB4";
    const colorGray = "#C5C7CC";

    return {
        colorBlue,
        colorYellow,
        colorGreen,
        colorRed,
        colorPurple,
        colorDeepBlue,
        colorGray,
    };
});
