# 构建产物格式教学示例

这个项目演示了如何使用 Rollup 将一个简单的 JavaScript 库打包成不同的格式 (IIFE, ESM, CJS)，以适应不同的使用场景。

## 项目结构

```
build-formats-demo/
├── dist/              # 构建产物目录
│   ├── my-library.iife.js
│   ├── my-library.esm-browser.js
│   ├── my-library.esm-bundler.js
│   └── my-library.cjs.js
├── src/               # 源代码目录
│   └── my-library.js
├── bundler-example/   # 使用打包工具的示例
│   ├── index.html
│   └── main.js
├── index.html         # IIFE 格式使用示例
├── index.esm.html     # ESM (浏览器) 格式使用示例
├── server.js          # CJS 格式使用示例 (Node.js)
├── package.json
└── rollup.config.js
```

## 如何运行

1.  安装依赖: `npm install`
2.  执行构建: `npm run build`
3.  查看示例:
    - 在浏览器中打开 `index.html` 查看 IIFE 示例。
    - 在浏览器中打开 `index.esm.html` 查看 ESM (浏览器) 示例。
    - 运行 `node server.js` 查看 CJS 示例。
    - (可选) 进入 `bundler-example` 目录，根据其内部说明运行打包工具示例。
