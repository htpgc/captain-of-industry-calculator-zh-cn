# Captain of Industry 计算器 / 工厂规划器（简体中文版）

本仓库是 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)（MIT，作者 Alexey Usov）的**简体中文本地化二改版**，面向工厂管理类游戏的生产链计算与工厂规划。

- 仓库地址：<https://github.com/htpgc/captain-of-industry-calculator-zh-cn>
- 上游项目：<https://github.com/doubleaxe/daxfb-calculator>
- 游戏数据版本：Captain of Industry **0.8.7b**
- 界面语言：固定简体中文

## 与上游版本的差异

| 项目 | 说明 |
|---|---|
| 界面语言 | 固定为简体中文，不再提供语言切换 |
| 游戏数据 | 重新导出并导入 Captain of Industry 0.8.7b 数据，补齐缺失图标 |
| 署名 | 「关于」对话框新增一行：翻译 / 二次开发 htpgc |
| 其他 | 计算逻辑、交互方式、数据格式与上游保持一致 |

## 引用的库与数据来源

### 上游项目

| 名称 | 说明 | 许可 |
|---|---|---|
| [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) | 本项目的原始项目（计算器 / 工厂规划器） | MIT |
| [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) | Captain of Industry 游戏数据导出 Mod（子模块） | 见上游仓库 |

### 游戏数据来源

- 游戏：Captain of Industry 0.8.7b（<https://www.captain-of-industry.com/>）
- 数据经游戏内数据导出 Mod 导出后，由 `data/coi/grabber/grab-data.ts` 转换为计算器格式
- 图标来自游戏资源，经 `npm run build-data` 打包为 `site/public/games/coi/images.png`

### 主要运行时依赖

| 库 | 用途 |
|---|---|
| [Vue 3](https://vuejs.org/) | 前端框架 |
| [Vuetify 3](https://vuetifyjs.com/) + [@mdi/js](https://github.com/Templarian/MaterialDesign-JS) | UI 组件与图标 |
| [Vite](https://vitejs.dev/) | 开发与构建工具 |
| [dagre](https://github.com/dagrejs/dagre) / [elkjs](https://github.com/kieler/elkjs) | 工厂图的自动布局 |
| [d3-shape](https://github.com/d3/d3-shape) | 连线的曲线绘制 |
| [@ellbur/javascript-lp-solver](https://github.com/ellbur/javascript-lp-solver) | 生产链线性规划求解 |
| [pako](https://github.com/nodeca/pako) / [js-base64](https://github.com/dankogai/js-base64) | 游戏数据的 deflate 压缩与 base64 编码 |
| [systemjs](https://github.com/systemjs/systemjs) | 游戏数据包的按需加载 |
| [@vueuse/core](https://vueuse.org/) | Vue 组合式工具集 |

### 主要构建期依赖

| 库 | 用途 |
|---|---|
| TypeScript / vue-tsc | 类型检查 |
| ts-node | 执行 `build-data`、`build-docs` 脚本 |
| rollup / esbuild | 游戏数据包的打包 |
| jimp | 图标贴图的合成与补齐 |
| marked + github-markdown-css | 帮助文档（`docs`）渲染 |
| ajv | 数据格式校验 |
| sass / eslint / stylelint | 样式与代码规范 |

## 使用方法（Release 发布包）

发布包是构建好的静态站点，解压即可离线使用。

### 1. 下载

打开仓库的 [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases) 页面，下载最新版本的压缩包：

```
daxfb-calculator-<版本标签>.zip
```

### 2. 解压

将压缩包解压到任意目录，例如 `D:\COI-Calculator`。解压后目录结构如下：

```
index.html        入口页面
assets/           脚本与样式
docs/             帮助文档
games/            各游戏数据包（coi / evospace / sample）
favicon.ico
```

### 3. 通过 HTTP 静态服务器打开（必须）

受浏览器 `file://` 协议的 CORS 限制，**不能直接双击 `index.html` 打开**，需要用一个 HTTP 静态服务器托管解压目录：

```powershell
# 方式一：Python（在解压目录内执行）
python -m http.server 8080

# 方式二：Node.js
npx serve -l 8080
```

然后在浏览器访问：

```
http://localhost:8080/index.html?gameId=coi
```

其中 `?gameId=` 用于直接打开指定游戏：`coi`（Captain of Industry）、`evospace`、`sample`。省略该参数会进入游戏选择页。

### 4. 部署到静态托管

由于构建使用相对路径，整个目录可直接放到任意静态服务器（Nginx、Apache、对象存储、GitHub Pages 子路径均可），无需额外配置。

## 从源码构建

环境要求：Node.js 18 或更高版本。

```powershell
npm install -g pnpm
pnpm install
npm run build
```

构建产物输出到 `dist\`。若类型检查报错，可分段构建：

```powershell
npm run build-data
npm run build-docs
npm run build-only
```

开发调试：

```powershell
npm run dev        # 启动开发服务器
npm run preview    # 预览已构建的 dist
```

## 更新游戏数据（可选）

Captain of Industry 数据来自子模块 `data/coi/grabber/captain-of-data`，需先按上游说明构建并运行数据导出 Mod，再将导出的 JSON 与图标回填到该目录，然后执行：

```powershell
npx ts-node data/coi/grabber/grab-data.ts
npm run build-data
```

详见上游项目 [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data)。

## 帮助文档

使用说明位于 `docs` 文件夹，构建后随站点一起发布，访问：

```
http://localhost:8080/docs/
```

## 发布流程（维护者）

仓库保留了上游的 GitHub Actions 工作流 `.github/workflows/deploy-release.yml`：推送 `v1.*` 形式的标签（例如 `v1.0.28-zh`）时，会自动构建、生成 `daxfb-calculator-<标签>.zip` 并创建草稿 Release；如仓库已启用 GitHub Pages，同时会部署到 Pages。

## 许可与致谢

- 本项目基于 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) 二次开发，遵循 [MIT License](LICENSE)，原始版权归 Alexey Usov (dax@xdax.ru, <https://github.com/doubleaxe>) 所有。
- 感谢上游作者及 Captain of Industry 官方提供的游戏数据。
- 本仓库的简体中文本地化、0.8.7b 数据重导与图标补齐工作由 [htpgc](https://github.com/htpgc) 完成。

---

**简体中文本地化，COI 0.8.7b 数据重导补齐图标。**

---

# Captain of Industry Calculator / Factory Planner (Simplified Chinese)

This repository is a **Simplified Chinese localization and secondary development** of
[doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) (MIT, by Alexey Usov),
a calculator / factory planner for factory management games.

- Repository: <https://github.com/htpgc/captain-of-industry-calculator-zh-cn>
- Upstream project: <https://github.com/doubleaxe/daxfb-calculator>
- Game data version: Captain of Industry **0.8.7b**
- UI language: Simplified Chinese (fixed)

## Differences from upstream

| Item | Description |
|---|---|
| UI language | Fixed to Simplified Chinese, no language switcher |
| Game data | Re-exported and re-imported Captain of Industry 0.8.7b data, with icons completed |
| Credits | The About dialog has an extra line: translated / reworked by htpgc |
| Others | Calculation logic, interaction and data format stay the same as upstream |

## Libraries and data sources

### Upstream projects

| Name | Description | License |
|---|---|---|
| [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) | Original project (calculator / factory planner) | MIT |
| [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) | Captain of Industry data export mod (submodule) | See upstream |

### Game data

- Game: Captain of Industry 0.8.7b (<https://www.captain-of-industry.com/>)
- Data is exported by an in-game data extractor mod, then converted by `data/coi/grabber/grab-data.ts`
- Icons come from game assets and are packed into `site/public/games/coi/images.png` by `npm run build-data`

### Main runtime dependencies

| Library | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | Frontend framework |
| [Vuetify 3](https://vuetifyjs.com/) + [@mdi/js](https://github.com/Templarian/MaterialDesign-JS) | UI components and icons |
| [Vite](https://vitejs.dev/) | Dev server and bundler |
| [dagre](https://github.com/dagrejs/dagre) / [elkjs](https://github.com/kieler/elkjs) | Automatic layout of factory graphs |
| [d3-shape](https://github.com/d3/d3-shape) | Connection curves |
| [@ellbur/javascript-lp-solver](https://github.com/ellbur/javascript-lp-solver) | Linear programming solver for production chains |
| [pako](https://github.com/nodeca/pako) / [js-base64](https://github.com/dankogai/js-base64) | deflate compression and base64 encoding of game data |
| [systemjs](https://github.com/systemjs/systemjs) | On-demand loading of game data packages |
| [@vueuse/core](https://vueuse.org/) | Vue composition utilities |

### Main build-time dependencies

| Library | Purpose |
|---|---|
| TypeScript / vue-tsc | Type checking |
| ts-node | Runs `build-data` and `build-docs` scripts |
| rollup / esbuild | Bundling of game data packages |
| jimp | Icon sprite composition |
| marked + github-markdown-css | Help documentation (`docs`) rendering |
| ajv | Data schema validation |
| sass / eslint / stylelint | Styling and code style |

## How to use (release package)

The release package is a pre-built static site; just unzip it and use it offline.

### 1. Download

Open the [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases) page and download:

```
daxfb-calculator-<tag>.zip
```

### 2. Unzip

Extract the archive anywhere, for example `D:\COI-Calculator`:

```
index.html        entry page
assets/           scripts and styles
docs/             help documentation
games/            game data packages (coi / evospace / sample)
favicon.ico
```

### 3. Serve it over HTTP (required)

Because of the browser CORS policy for the `file://` protocol, **opening `index.html` directly does not work**.
Serve the extracted folder with any HTTP static server:

```powershell
# Option 1: Python (run inside the extracted folder)
python -m http.server 8080

# Option 2: Node.js
npx serve -l 8080
```

Then open:

```
http://localhost:8080/index.html?gameId=coi
```

`?gameId=` opens a specific game directly: `coi` (Captain of Industry), `evospace`, `sample`.
Without it you get the game selection page.

### 4. Deploy to static hosting

All paths in the build are relative, so the folder can be dropped onto any static server
(Nginx, Apache, object storage, or a GitHub Pages sub-path) without extra configuration.

## Building from source

Requirements: Node.js 18 or later.

```powershell
npm install -g pnpm
pnpm install
npm run build
```

The build output goes to `dist\`. If type checking fails, build step by step:

```powershell
npm run build-data
npm run build-docs
npm run build-only
```

Development:

```powershell
npm run dev        # start the dev server
npm run preview    # preview the built dist
```

## Updating game data (optional)

Captain of Industry data comes from the submodule `data/coi/grabber/captain-of-data`.
Build and run the data extractor mod as described upstream, put the exported JSON files and icons
into that folder, then run:

```powershell
npx ts-node data/coi/grabber/grab-data.ts
npm run build-data
```

See [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) for details.

## Help documentation

The user guide lives in the `docs` folder and is shipped with the site:

```
http://localhost:8080/docs/
```

## Release process (maintainers)

The repository keeps the upstream GitHub Actions workflow `.github/workflows/deploy-release.yml`:
pushing a tag matching `v1.*` (for example `v1.0.28-zh`) builds the project, produces
`daxfb-calculator-<tag>.zip` and creates a draft release; if GitHub Pages is enabled for the
repository, the site is deployed there as well.

## License and credits

- Based on [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator), licensed under the
  [MIT License](LICENSE). Original copyright (c) 2022-2023 Alexey Usov (dax@xdax.ru, <https://github.com/doubleaxe>).
- Thanks to the upstream author and to the Captain of Industry game data.
- Simplified Chinese localization, 0.8.7b data re-import and icon completion by [htpgc](https://github.com/htpgc).

---

**Simplified Chinese localization; Captain of Industry 0.8.7b data re-imported with icons completed.**
