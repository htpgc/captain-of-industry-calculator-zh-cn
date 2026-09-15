# Changelog

本文件记录 Captain of Industry 简体中文社区维护版的重要版本变更。

This file documents notable changes to the Simplified Chinese community-maintained edition of Captain of Industry.

## [v1.0.0] - 2026-09-15

首个正式发布版本。

First stable release.

### 中文

#### 新增与调整

- 项目正式收敛为 **Captain of Industry 专用简体中文版本**。
- Captain of Industry 游戏数据更新至 **0.8.7b**。
- 补齐部分新版数据对应的物品、建筑等图标。
- 界面固定为简体中文，并移除不再需要的语言切换相关内容。
- 打开页面后默认直接加载 Captain of Industry，无需再经过游戏选择页。
- 正式发布包仅保留 Captain of Industry，停止打包 Evospace 与 Sample Game。
- 移除运行时外部 polyfill CDN 依赖。
- Release 解压后可直接双击 `index.html` 本地运行，无需额外安装 Node.js、Python，也无需启动本地 HTTP 静态服务器。
- 支持在无网络环境下离线使用。
- 完整整理并汉化用户帮助文档。
- 根目录 README 拆分为：
  - `README.md`：中文
  - `README_EN.md`：English
- 更新项目标题、描述、canonical 地址及仓库相关元数据。
- 更新 `package.json` 中的仓库地址、主页、Issue 地址和维护者信息。
- 禁用正式构建 source map，减小发布包体积。
- GitHub Actions 更新至较新的稳定版本，并统一正式 Release 构建流程。
- Release 文件名统一为：

```text
captain-of-industry-calculator-zh-cn-<tag>.zip
```

#### 发布内容

正式发布包主要包含：

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

### English

#### Added and changed

- The project now focuses exclusively on **Captain of Industry** as a Simplified Chinese community-maintained edition.
- Updated Captain of Industry game data to **0.8.7b**.
- Added missing icons for several items and buildings introduced or changed in the updated data set.
- The UI is now fixed to Simplified Chinese, and unnecessary language-switching related content has been removed.
- Captain of Industry loads automatically on startup; the game selection page is no longer required.
- Production releases now include Captain of Industry only; Evospace and Sample Game are no longer packaged.
- Removed the external runtime polyfill CDN dependency.
- Release archives can be extracted and used by opening `index.html` directly, without installing Node.js or Python and without starting a local HTTP server.
- Offline use is supported without an internet connection.
- Reworked and localized the user documentation into Simplified Chinese.
- Split the root README into:
  - `README.md`: Chinese
  - `README_EN.md`: English
- Updated page title, description, canonical URL, and repository metadata.
- Updated repository, homepage, issue tracker, and maintainer metadata in `package.json`.
- Disabled production source maps to reduce release size.
- Updated GitHub Actions to newer stable versions and standardized the release workflow.
- Standardized release archive naming as:

```text
captain-of-industry-calculator-zh-cn-<tag>.zip
```

#### Release contents

Production releases mainly contain:

```text
index.html
assets/
docs/
games/
└─ coi/
favicon.ico
```

Production releases no longer include:

```text
Evospace
Sample Game
Source Map (*.map)
```

## Upstream / 上游项目

核心计算逻辑与主要交互机制来自 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)。

The core calculation logic and primary interaction model are based on [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator).

Captain of Industry 游戏数据通过 [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data) 导出。

Captain of Industry game data is exported using [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data).
