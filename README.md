# dashboard

## 使用技術

### UI
- [element plus](https://element-plus.org/zh-CN/)

### Plugin
- [Apache ECharts](https://echarts.apache.org/zh/index.html)


## 版本需求
```
 Node V20
```

## ENV
- 變數名稱必須以 VITE_ 開頭，這是 Vite 的規定，以確保變數能夠正確地注入到應用中。
- 取變數可使用`import.meta.env`取用，ex. `import.meta.env.VITE_APP_DESC`

## 其他注意事項
本專案有使用eslint、stylelint，請在vscode安裝並設定存檔時自動format

-------

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production
- 請根據環境更換build指令，如正式站為`build:prod`，可確認`package.json`

```sh
## 測試站
npm run build:test
## 正式站
npm run build:prod
```