import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
    base: "/business/",
    plugins: [
        vue(),
        vueDevTools(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@img": fileURLToPath(new URL("./src/assets/images", import.meta.url)),
            "@style": fileURLToPath(new URL("./src/assets/styles", import.meta.url)),
            "@data": fileURLToPath(new URL("./src/assets/data", import.meta.url)),
        },
    },
});
