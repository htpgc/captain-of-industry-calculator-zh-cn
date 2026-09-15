# Captain of Industry 计算器 / 工厂规划器（简体中文版）

[中文](README.md) | [English](README_EN.md)

本仓库是 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) 的 **Captain of Industry 简体中文社区维护版**，基于 MIT License 二次开发。

当前版本专注于 Captain of Industry，不再发布 Evospace 与 Sample Game 数据包。

- 上游项目：[doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)
- 数据导出工具：[doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data)
- 游戏数据版本：Captain of Industry **0.8.7b**
- 界面语言：固定简体中文
- 在线版本：<https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>

## 与上游版本的主要差异

| 项目 | 说明 |
|---|---|
| 项目定位 | 专注 Captain of Industry 的简体中文社区维护版 |
| 界面语言 | 固定为简体中文，不再提供语言切换 |
| 默认游戏 | 打开页面后直接加载 Captain of Industry，无需游戏选择页 |
| 游戏数据 | 重新导出并导入 Captain of Industry 0.8.7b 数据，并补齐缺失图标 |
| 发布内容 | Release 仅包含 Captain of Industry 数据，不再打包 Evospace / Sample Game |
| 离线使用 | 不依赖外部 CDN；下载后通过本地 HTTP 静态服务器即可离线运行 |
| 核心逻辑 | 核心计算逻辑及主要交互机制沿用上游项目 |

## Release 使用方法

发布包为构建好的静态站点，**无需安装依赖或重新构建**。由于浏览器对 `file://` 协议有限制，不能直接双击 `index.html`，需要通过本地 HTTP 静态服务器访问。

### 1. 下载并解压

从 [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases) 下载最新版本，例如：

```text
captain-of-industry-calculator-zh-cn-v1.0.0.zip
```

解压后的主要目录：

```text
index.html        入口页面
assets/           脚本与样式
docs/             简体中文帮助文档
games/coi/        Captain of Industry 数据包
favicon.ico
```

### 2. 启动本地静态服务器

在解压目录打开终端：

```powershell
# Python
python -m http.server 8080

# 或 Node.js
npx serve -l 8080
```

然后访问：

```text
http://localhost:8080/
```

页面会自动加载 Captain of Industry。

也兼容原有参数：

```text
http://localhost:8080/?gameId=coi
```

### 3. 完全离线使用

Release 中所需脚本、样式、游戏数据和图标均随发布包提供，不再加载外部 polyfill CDN。因此启动本地 HTTP 服务后可在无网络环境中使用。

## GitHub Pages / 静态托管

构建使用相对路径，可部署到 GitHub Pages、Nginx、Apache 或其他静态文件托管服务。

本仓库 Pages 地址：

<https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>

## 从源码构建

环境要求：

- Node.js 18 或更高版本
- pnpm 8.3.1
- Git（需要拉取 Captain of Industry 数据导出子模块）

克隆仓库：

```bash
git clone --recurse-submodules https://github.com/htpgc/captain-of-industry-calculator-zh-cn.git
cd captain-of-industry-calculator-zh-cn
```

安装依赖并构建：

```bash
pnpm install
pnpm run build
```

构建产物位于：

```text
dist/
```

开发调试：

```bash
pnpm run dev
```

预览构建结果：

```bash
pnpm run preview
```

## 更新 Captain of Industry 数据

Captain of Industry 数据来源于：

<https://github.com/doubleaxe/captain-of-data>

子模块路径：

```text
data/coi/grabber/captain-of-data
```

按上游说明构建并运行数据导出 Mod，将导出的 JSON 与图标更新到相应目录后执行：

```bash
npx ts-node data/coi/grabber/grab-data.ts
pnpm run build-data
```

`site/data/types/game-list.json` 当前仅包含 `coi`，因此正式构建只生成：

```text
site/public/games/coi/
```

## 帮助文档

简体中文使用说明位于：

```text
docs/README.md
```

构建后可访问：

```text
/docs/
```

## 主要技术栈

- Vue 3
- Vuetify 3
- Vite
- dagre / elkjs
- d3-shape
- @ellbur/javascript-lp-solver
- pako / js-base64
- systemjs
- TypeScript

## 许可与致谢

本项目基于 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) 二次开发，并继续遵循 [MIT License](LICENSE)。

原始项目版权归 Alexey Usov（doubleaxe）所有。核心计算逻辑与主要交互机制来自上游项目。

Captain of Industry 游戏数据通过 [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) 导出。本仓库的简体中文本地化、Captain of Industry 0.8.7b 数据重导、图标补齐及发布维护由 [htpgc](https://github.com/htpgc) 完成。

## 更新记录

详细变更见 [CHANGELOG.md](CHANGELOG.md)。
