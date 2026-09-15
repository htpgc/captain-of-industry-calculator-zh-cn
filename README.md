# Captain of Industry 计算器 / 工厂规划器（简体中文版）

[English](README_EN.md)

本仓库基于 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)（MIT，原作者 Alexey Usov）进行简体中文本地化，并更新 Captain of Industry 游戏数据，面向生产链计算与工厂规划。

- 仓库：<https://github.com/htpgc/captain-of-industry-calculator-zh-cn>
- 上游：<https://github.com/doubleaxe/daxfb-calculator>
- 应用/本地化版本：`1.0.28-zh.1`
- Captain of Industry 数据版本：**0.8.7b**
- 数据修订：`1`
- 界面语言：固定简体中文
- 变更记录：[CHANGELOG.md](CHANGELOG.md)

## 与上游版本的差异

| 项目 | 本仓库 |
|---|---|
| 界面语言 | 固定简体中文，不提供语言切换 |
| COI 游戏数据 | 重新导出并导入 0.8.7b 数据，补齐缺失图标 |
| 本地运行 | 提供可由本地 HTTP 静态服务器运行的构建产物 |
| 维护方式 | 应用版本与游戏数据版本分别记录，并增加 CI / Release 工作流 |
| 核心逻辑 | 计算逻辑、主要交互和游戏数据格式尽量保持上游兼容 |

## 版本规则

本仓库将“计算器代码版本”和“游戏数据版本”分开管理：

- `package.json` 的 `version`：应用/简体中文分支版本，例如 `1.0.28-zh.1`。
- `data/coi/version.json`：Captain of Industry 数据版本、数据修订号和导出日期。
- Release 标签：继续使用 `zh-cn-*`，例如 `zh-cn-0.8.7b`。如果同一游戏版本仅修订数据或发布包，可使用 `zh-cn-0.8.7b-r2`、`r3` 等后缀。

这样更新中文界面、构建流程或说明文档时，不需要伪装成新的 COI 游戏版本；反之，游戏数据更新也可以被明确追踪。

## 使用 Release 发布包

打开仓库的 [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases) 页面并下载最新 ZIP。历史 `zh-cn-0.8.7b` Release 的文件名可能仍为旧命名；新工作流生成的发布包统一为：

```text
captain-of-industry-calculator-zh-cn-<tag>.zip
```

解压后可看到类似结构：

```text
index.html
assets/
docs/
games/
favicon.ico
```

### 通过 HTTP 静态服务器打开

浏览器的 `file://` 协议会受到 CORS 限制，因此不要直接双击 `index.html`。在解压目录启动任意静态 HTTP 服务，例如：

```powershell
# Python
python -m http.server 8080

# 或 Node.js
npx serve -l 8080
```

然后访问：

```text
http://localhost:8080/index.html?gameId=coi
```

`gameId` 仍支持 `coi`、`evospace`、`sample`。省略参数时进入游戏选择页。

构建继续使用相对路径，因此整个 `dist`/Release 目录可部署到 Nginx、Apache、对象存储或 GitHub Pages 子路径，不需要把 Vite `base` 固定为某个仓库地址。

## 从源码构建

环境要求：Git、Node.js 18 或更高版本，以及 Corepack/pnpm。

推荐连同子模块一起克隆：

```powershell
git clone --recurse-submodules https://github.com/htpgc/captain-of-industry-calculator-zh-cn.git
cd captain-of-industry-calculator-zh-cn
corepack enable
pnpm install --frozen-lockfile
pnpm run build
```

如果已经普通克隆，可补充初始化子模块：

```powershell
git submodule update --init --recursive
```

构建产物输出到 `dist\`。需要分步执行时：

```powershell
pnpm run type-check
pnpm run build-data
pnpm run build-docs
pnpm run build-only
```

开发和预览：

```powershell
pnpm run dev
pnpm run preview
```

代码规范检查：

```powershell
# 只检查，不修改文件；CI 使用这一条
pnpm run lint:check

# 本地自动修复 lint/style 问题
pnpm run lint
```

## 更新 Captain of Industry 游戏数据

COI 数据导出 Mod 位于 Git 子模块：

```text
data/coi/grabber/captain-of-data
```

数据更新原则：

1. 先将仓库和子模块固定到明确提交，避免无法复现的“最新 main”。
2. 按 [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) 的说明构建并在对应 COI 版本中导出数据。
3. 将导出的 JSON / 图标按本仓库现有数据链路更新。
4. 执行转换和数据构建：

```powershell
pnpm exec ts-node data/coi/grabber/grab-data.ts
pnpm run build-data
```

5. 更新 `data/coi/version.json` 中的 `gameVersion`、`dataRevision` 和 `exportedAt`。
6. 执行 `pnpm run lint:check` 与 `pnpm run build` 后再发版。

图标最终由构建流程打包到：

```text
site/public/games/coi/images.png
```

## GitHub Actions

- `CI`：对 `main` 推送和 Pull Request 执行依赖安装、lint、类型检查和完整构建。
- `Build and Deploy Release`：匹配 `zh-cn-*` 标签，构建站点、部署 GitHub Pages，并创建包含统一命名 ZIP 的草稿 Release。
- 工作流使用 `pnpm install --frozen-lockfile`，避免锁文件与实际安装结果悄然漂移。

## 维护边界

常规“中文本地化 / COI 数据更新”提交不同时进行以下大范围改动：Vue/Vuetify/Vite/TypeScript 等主要依赖大版本升级、核心计算器重构、完整多语言 i18n 框架引入，以及把 Vite 相对路径改成固定站点路径。这些工作如未来确有需要，应分别建立独立分支、独立测试。

## 引用的项目与主要依赖

| 名称 | 用途 | 许可/来源 |
|---|---|---|
| [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) | 原始计算器 / 工厂规划器 | MIT |
| [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) | Captain of Industry 数据导出 Mod | 见上游仓库 |
| Vue 3 / Vuetify 3 / Vite | 前端与构建 | 各项目许可 |
| dagre / elkjs / d3-shape | 工厂图布局与连线 | 各项目许可 |
| @ellbur/javascript-lp-solver | 生产链线性规划 | 上游项目许可 |
| pako / js-base64 / systemjs | 数据压缩与按需加载 | 各项目许可 |
| Jimp / Rollup / esbuild / ts-node | 数据与图标构建 | 各项目许可 |

## 许可与致谢

本项目基于 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) 二次开发，继续遵循仓库中的 [MIT License](LICENSE)。原始作者和版权信息予以保留。

简体中文本地化、Captain of Industry 0.8.7b 数据重导与图标补齐由 [htpgc](https://github.com/htpgc) 维护。
