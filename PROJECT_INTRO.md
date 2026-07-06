# number-flip 项目概览

> 补充文档：仓库已有 [README.md](./README.md)（安装、API、用法示例），本文侧重 agent/新人快速理解结构与入口链路。

## 项目定位

**number-flip** 是一个轻量级前端数字翻页动画库：在指定 DOM 节点内生成逐位滚动的数字结构，通过 `requestAnimationFrame` 驱动从 `from` 到 `to` 的翻转过渡。面向需要在页面中展示计数器、仪表盘、抽奖/洗牌等数字变化动效的前端开发者。

核心能力（均可在源码路径核对）：

1. **实例化即翻转**：`new Flip({ node, from, to })` 构造时自动初始化 DOM 并启动动画（`number-flip.ts` 中 `Flip` 构造函数 → `_initHTML` → `flipTo`）。
2. **延迟 / 手动触发**：支持 `delay` 延迟启动，或省略 `to` 后调用 `flipTo({ to })` 在任意时刻翻转（`Flip.flipTo`）。
3. **可定制数字系统与分隔符**：`systemArr` 可替换为中文大写等十位字符集；`separator` / `separateEvery` 支持千分位或自定义分段（`FlipOptions` + `_initHTML` 分隔符分支）。
4. **样式与类名可配置**：通过 `.digit` / `.ctnr` 等 CSS 控制尺寸；`containerClassName`、`digitClassName`、`separatorClassName` 可重命名（README + `FlipOptions`）。
5. **多格式产物发布**：tsup 输出 ESM / CJS / IIFE，供 npm 与现代 bundler 消费（`package.json` 的 `exports`）。

典型用法/场景：

- 页面计数器从旧值平滑滚到新值（README usage 示例）。
- 中文数字展示（`example/index.js` 使用 `systemArr: ['零','壹',…]`）。
- 交互式随机数洗牌演示（`example/index.js` 中 `.shuffle` 按钮调用 `flip.flipTo`）。

## 技术栈

| 类别 | 选型 | 证据 |
|------|------|------|
| 语言 | TypeScript（编译目标 ES5） | `number-flip.ts`、`tsconfig.json` |
| 运行时 | 浏览器 DOM API（无框架依赖） | `number-flip.ts` 使用 `document.createElement`、`requestAnimationFrame` |
| 构建（库） | tsup 8 + esbuild | `package.json` scripts、`tsup.config.ts` |
| 示例 dev server | Vite 6 | `package.json` → `"dev": "vite"`、`vite.config.ts` |
| 包管理 | npm / yarn（README 示例用 yarn） | `package.json`、`README.md` |

运行时无生产依赖（`dependencies` 为空）；构建与示例仅依赖 `devDependencies`。

## 入口链路（从启动到业务入口）

### 本地开发演示

1. **启动命令**：`npm run dev` 或 `yarn dev`（来源：`package.json` → `scripts.dev`）
2. **Vite 入口**：`example/index.html` — 静态 HTML，挂载 `.flip` 容器与按钮
3. **示例脚本**：`example/index.js` — `import { Flip } from '../number-flip'`，创建实例并绑定 `.shuffle` / `.destroy` 点击事件
4. **库核心**：`number-flip.ts` — 导出 `Flip` 类；构造函数调用 `_initHTML` 生成 `.number-flip > .ctnr > .digit` 结构，动画由 `flipTo` → `frame` → `_draw` 完成

### 库构建与消费

1. **构建命令**：`npm run build` 或 `yarn build`（来源：`package.json` → `scripts.build`）
2. **tsup 打包**：`number-flip.ts` → `dist/number-flip.mjs`（ESM）、`dist/number-flip.cjs`（CJS）、`dist/index.js`（IIFE，全局 `NumberFlip`）
3. **类型生成**：tsup `--dts` → `dist/number-flip.d.ts`
4. **业务接入**：`import { Flip } from 'number-flip'`，传入已存在于 DOM 的 `node`（README usage）

## 目录结构（文件树 + 目录用途）

```text
number-flip/
├─ number-flip.ts              # 库唯一源码：Flip 类、DOM 结构、动画帧逻辑
├─ package.json                # 包元数据、dev/build scripts、exports 入口
├─ tsconfig.json               # TS 严格模式；供 IDE / tsup 读取
├─ tsup.config.ts              # 库构建：ESM / CJS / IIFE 三格式
├─ vite.config.ts              # example 本地 dev server
├─ README.md                   # 安装、API 参数、用法示例、dev/build 命令
├─ PROJECT_INTRO.md            # 本文件：结构与入口概览（agent/onboarding）
├─ test.js                     # BrowserStack + Selenium 远程浏览器探测脚本（非单元测试）
├─ demo.gif / demo2.gif        # README 动效展示
├─ example/                    # 本地演示页
│  ├─ index.html               # 演示 DOM：.flip 容器、shuffle/destroy 按钮
│  ├─ index.js                 # 演示逻辑：Flip 实例、随机 flipTo、destroy
│  ├─ main.css                 # 演示样式（digit 尺寸等）
│  └─ README.md                # 示例单独说明：全局 poi --serve index.html
├─ dist/                       # 构建产物（勿手改）
│  ├─ number-flip.mjs          # ESM bundle
│  ├─ number-flip.cjs          # CJS bundle
│  ├─ index.js                 # IIFE bundle（NumberFlip）
│  └─ number-flip.d.ts         # 类型声明
└─ .github/                    # GitHub 模板（ISSUE_TEMPLATE、FUNDING）
```

## 启动（Dev / Local）

命令均来自 `package.json` → `scripts`：

| 用途 | 命令 | 说明 |
|------|------|------|
| 演示 dev server | `npm run dev` 或 `yarn dev` | Vite，`root: example`；默认 `http://localhost:5173` |
| 仅跑 example | 在 `example/` 下 `npx vite` | 见 `example/README.md` |

环境要求：

- Node.js（需能运行 tsup 8 与 Vite 6）
- 首次需 `npm install` 或 `yarn` 安装 `devDependencies`

## 构建（Build / Production）

命令来源：`package.json` → `scripts.build`：

```bash
npm run build
# 或
yarn build
```

实际执行：

```bash
tsup
```

产物：

- `dist/number-flip.mjs` — ESM（`exports.import`）
- `dist/number-flip.cjs` — CJS（`exports.require`）
- `dist/index.js` — IIFE，全局 `NumberFlip`（`main` / `exports.default`）
- `dist/number-flip.d.ts` — 类型声明（`types`）

发布 npm 前需先 build；仓库未包含 `prepublishOnly` 等 hook，需手动构建。

## 配置与环境变量（如果有则写，没有则写「未发现」）

**未发现**项目级环境变量文件（无 `.env`、无 `process.env` 读取）。

与运行相关的配置：

- **tsup**：`tsup.config.ts` — ESM / CJS / IIFE 三格式 + dts。
- **Vite**：`vite.config.ts` — example dev server。
- **TypeScript**：`tsconfig.json` — `target: ES2015`、`strict: true`。
- **BrowserStack 凭据**：`test.js` 内硬编码 `browserstack.user` / `browserstack.key`（仅用于远程浏览器测试脚本，非库运行时配置；含敏感信息，勿提交新密钥）。
