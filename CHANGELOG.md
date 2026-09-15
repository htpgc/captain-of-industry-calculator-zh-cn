# Changelog

本文件记录 Captain of Industry 简体中文社区维护版的重要版本变更。

This file documents notable changes to the Simplified Chinese community-maintained edition of Captain of Industry.

## [v1.1.0] - 2026-09-15

本版本重点改进生产链编辑效率，为物料端口增加快捷来源/去向菜单，并加入按物料类型自动匹配储存设施的功能。

This release focuses on faster production-chain editing, adds quick source/destination menus for material ports, and automatically offers matching storage by material type.

### 中文

#### 新增

- 新增物料端口快捷来源/去向菜单：
  - 单击输入物料图标可直接打开 `Add producing factory` 来源菜单；
  - 单击输出物料图标可直接打开 `Add consuming factory` 去向菜单。
- 保留并增强从物料端口拖到空白区域后选择来源/去向建筑的操作。
- 来源与去向菜单会根据物料类型自动加入对应储存设施：
  - 散装物（Loose）→ **散装物存储**；
  - 流体（Fluid）→ **流体存储罐**；
  - 单位物品（Countable）→ **单位存储**。
- 增加对抽象物料类型的匹配支持，包括：
  - `AnyLooseProduct`
  - `AnyFluidProduct`
  - `AnyCountableProduct`
- 新建储存设施默认使用 `InOut` 配方，因此同时保留输入与输出端，可继续串联生产链。
- 选择储存设施后会自动创建建筑并建立连接。
- 储存中的抽象物料会根据当前连接自动实例化为实际物料，例如煤、矿渣、柴油等。

#### 修复与调整

- 修正来源/去向候选只按具体物品名称匹配、导致抽象储存配方无法显示的问题。
- 修正储存作为来源时无法正确匹配实际输入物料的问题。
- 修正储存作为去向时无法正确匹配实际输出物料的问题。
- 修正新增 Vue 事件处理中的 TypeScript 隐式 `any` 类型错误，恢复正式构建通过。
- README 中补充 Windows PowerShell 下使用 `pnpm.cmd` 构建的说明。

### English

#### Added

- Added quick source/destination menus for material ports:
  - click an input material icon to open the `Add producing factory` menu;
  - click an output material icon to open the `Add consuming factory` menu.
- Kept and improved the workflow of dragging a material port into empty space and selecting a source or destination building.
- Source and destination menus now add matching storage automatically by material type:
  - Loose → **Loose Storage**;
  - Fluid → **Fluid Storage**;
  - Countable → **Unit Storage**.
- Added abstract material type matching for:
  - `AnyLooseProduct`
  - `AnyFluidProduct`
  - `AnyCountableProduct`
- Newly created storage uses the `InOut` recipe so both input and output remain available for further chaining.
- Selecting storage automatically creates the building and links it to the current material port.
- Abstract storage materials are automatically materialized into the actual connected product, such as coal, slag, diesel, and others.

#### Fixed and changed

- Fixed source/destination suggestions only matching exact product names, which prevented abstract storage recipes from appearing.
- Fixed storage not matching correctly when used as a material source.
- Fixed storage not matching correctly when used as a material destination.
- Fixed TypeScript implicit `any` errors introduced by the new Vue event handlers so production builds pass again.
- Added Windows PowerShell build guidance using `pnpm.cmd` to the README.

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
