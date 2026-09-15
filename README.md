# Captain of Industry 计算器 / 工厂规划器（简体中文版）

[中文](README.md) | [English](README_EN.md)

本仓库是 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) 的 **Captain of Industry 简体中文社区维护版**，基于 MIT License 二次开发。

当前版本专注于 Captain of Industry，提供简体中文界面、更新后的游戏数据以及可直接本地运行的独立发布包。

- 当前版本：**v1.0.0**
- 游戏数据版本：Captain of Industry **0.8.7b**
- 界面语言：**简体中文**
- 在线版本：<https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>
- 上游项目：[doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)
- 数据导出工具：[doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data)

## 项目特点

| 项目 | 说明 |
|---|---|
| 项目定位 | 专注 Captain of Industry 的简体中文社区维护版 |
| 默认游戏 | 打开页面后直接加载 Captain of Industry，无需游戏选择页 |
| 游戏数据 | 更新至 Captain of Industry 0.8.7b，并补齐部分缺失图标 |
| 发布内容 | 正式发布包仅包含 Captain of Industry，不再包含 Evospace 与 Sample Game |
| 本地运行 | Release 解压后可直接双击 `index.html` 使用，无需启动本地服务器 |
| 离线使用 | 运行所需脚本、样式、数据和图标均包含在发布包内，可在无网络环境下使用 |
| 文档 | 提供简体中文帮助文档，并将中英文 README 分离维护 |
| 核心逻辑 | 核心计算逻辑及主要交互机制沿用上游项目 |

## 下载与使用

前往 [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases) 下载最新正式版本。

推荐下载文件：

```text
captain-of-industry-calculator-zh-cn-v1.0.0.zip
```

解压后，直接双击：

```text
index.html
```

即可在浏览器中打开并使用 Captain of Industry 计算器。

**无需安装 Node.js、Python 或其他运行环境，也无需单独启动本地 HTTP 静态服务器。**

发布包主要结构：

```text
index.html
assets/
docs/
games/
└─ coi/
favicon.ico
```

正式发布包不再包含：

```text
Evospace
Sample Game
Source Map (*.map)
```

## 在线使用

GitHub Pages：

<https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>

## 从源码构建

### 环境要求

- Node.js 18 或更高版本
- pnpm 8.3.1
- Git（如需完整拉取 Captain of Industry 数据导出子模块）

### 克隆仓库

```bash
git clone --recurse-submodules https://github.com/htpgc/captain-of-industry-calculator-zh-cn.git
cd captain-of-industry-calculator-zh-cn
```

### 安装依赖并构建

```bash
pnpm install
pnpm run build
```

构建完成后，输出目录为：

```text
dist/
```

开发模式：

```bash
pnpm run dev
```

预览正式构建：

```bash
pnpm run preview
```

## 更新 Captain of Industry 数据

Captain of Industry 游戏数据通过以下项目导出：

<https://github.com/doubleaxe/captain-of-data>

子模块路径：

```text
data/coi/grabber/captain-of-data
```

更新导出的 JSON 和图标资源后，可执行：

```bash
npx ts-node data/coi/grabber/grab-data.ts
pnpm run build-data
```

当前 `site/data/types/game-list.json` 仅包含 `coi`，因此正式构建只生成 Captain of Industry 数据。

## 帮助文档

简体中文使用说明位于：

```text
docs/README.md
```

正式构建后对应：

```text
docs/
```

## 主要技术栈

- Vue 3
- Vuetify 3
- Vite
- TypeScript
- dagre / elkjs
- d3-shape
- @ellbur/javascript-lp-solver
- pako / js-base64
- systemjs

## 许可与致谢

本项目基于 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) 二次开发，并继续遵循 [MIT License](LICENSE)。

原始项目版权归 Alexey Usov（doubleaxe）所有。核心计算逻辑与主要交互机制来自上游项目。

Captain of Industry 游戏数据通过 [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) 导出。本仓库的简体中文本地化、0.8.7b 数据整理、图标补齐及发布维护由 [htpgc](https://github.com/htpgc) 完成。

## 更新记录

详细版本变更见 [CHANGELOG.md](CHANGELOG.md)。
