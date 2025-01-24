import { ref, watchEffect } from "vue";

export function useFullscreen () {
    const isFullscreen = ref(false);

    const toggleFullscreen = (element = document.documentElement) => {
        if (isFullscreen.value) {
            exitFullscreen();
        } else {
            enterFullscreen(element);
        }
    };

    const enterFullscreen = async (element) => {
        if (element.requestFullscreen) {
            await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            console.warn("Fullscreen API is not supported on this browser.");
        }
    };

    const exitFullscreen = async () => {
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    // 監聽全螢幕變化
    const onFullscreenChange = () => {
        isFullscreen.value = !!document.fullscreenElement;
    };

    watchEffect(() => {
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", onFullscreenChange);
        };
    });

    return {
        isFullscreen,
        toggleFullscreen,
        enterFullscreen,
        exitFullscreen,
    };
}
