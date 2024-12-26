import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginVitest from "@vitest/eslint-plugin";

export default [
    {
        name: "app/files-to-lint",
        files: [
            "**/*.{js,mjs,jsx,vue}",
        ],
    },

    {
        name: "app/files-to-ignore",
        ignores: [
            "**/dist/**", "**/dist-ssr/**", "**/coverage/**",
        ],
    },

    js.configs.recommended,
    ...pluginVue.configs["flat/essential"],

    {
        ...pluginVitest.configs.recommended,
        files: [
            "src/**/__tests__/*",
        ],
    },
    {
        rules: {
            "vue/max-attributes-per-line": [
                "error",
                {
                    "singleline": 1,
                    "multiline": {
                        "max": 1, // 多行時每個屬性都換行
                    },
                },
            ],
            // 分號結尾
            "semi": [
                "error", "always",
            ],
            // 縮排為4個字元
            "indent": [
                "error", 4,
            ],
            // 預設雙引號，警告使用單引號，會引導使用雙引號
            "quotes": [
                "warn", "double", { "avoidEscape": true },
            ],
            // 物件屬性後面加逗號
            "comma-dangle": [
                "error", "always-multiline",
            ],
            // 函式名與括號之間空格，括號前加空格
            "space-before-function-paren": [
                "error", "always",
            ],
            "space-in-parens": [
                "error", "never",
            ],
            // 函式與函式之間空行分隔
            "padding-line-between-statements": [
                "error",
                {
                    "blankLine": "always",
                    "prev": "function",
                    "next": "function",
                },
            ],
            // Vue HTML 標籤的縮排為 4 個字元
            "vue/html-indent": [
                "error", 4,
            ],
            // 移除行末尾的多餘空白
            "no-trailing-spaces": [
                "error",
            ],
            // 移除多餘的空行，最大允許1行
            "no-multiple-empty-lines": [
                "error", {
                    "max": 1,
                    "maxEOF": 1,
                    "maxBOF": 0,
                },
            ],
            "vue/no-v-html": "off",
            // 強制每個物件屬性換行
            "object-property-newline": [
                "error", { allowAllPropertiesOnSameLine: false },
            ],
            // 強制物件的大括號內換行
            "object-curly-newline": [
                "error", {
                    multiline: true,
                    consistent: true,
                },
            ],
            // 陣列強制換行
            "array-bracket-newline": [
                "error", {
                    multiline: true,
                    minItems: 1,
                },
            ],
            // 所有二元運算符（如 =, +, -, *, /）的前後必須有空格
            "space-infix-ops": [
                "error", { "int32Hint": false },
            ],
            // {}內需有空格
            "object-curly-spacing": [
                "error", "always",
            ],
            // 要求關鍵字（如 from、if、else 等）前後必須有空格
            "keyword-spacing": [
                "error", {
                    "before": true,
                    "after": true,
                },
            ],
            // 禁止多餘的空格
            "no-multi-spaces": [
                "error",
            ],
            "vue/attribute-hyphenation": "off",
        },
    },
];
