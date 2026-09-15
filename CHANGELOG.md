# Changelog

本文件记录 Captain of Industry 简体中文社区维护版的重要变更。

## Unreleased

- 将项目定位统一为 Captain of Industry 简体中文社区维护版。
- 默认直接加载 Captain of Industry，不再显示游戏选择页。
- 正式构建与 Release 仅包含 Captain of Industry 数据。
- 移除 Evospace 子模块配置，并停止发布 Evospace / Sample Game 数据。
- 更新 Captain of Industry 游戏数据说明至 0.8.7b。
- 移除运行时外部 polyfill CDN，支持通过本地 HTTP 服务完全离线使用。
- 更新页面标题、作者、描述与 canonical 地址。
- 更新 `package.json` 的仓库、问题反馈、主页和维护者信息。
- 禁用正式构建 source map，减小 Release 体积。
- 完整汉化用户帮助文档。
- 更新 GitHub Actions 至较新的稳定主版本，并统一 Release 文件名。
- Release 文件名统一为 `captain-of-industry-calculator-zh-cn-<tag>.zip`。

## 2026-09-15

- 完成 Captain of Industry 0.8.7b 数据重新导入。
- 补齐新版数据对应图标。
- 完成简体中文界面本地化与本地发布包整理。

## Upstream

核心计算逻辑及主要交互机制来自 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)。
