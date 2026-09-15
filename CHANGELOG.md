# Changelog

本文件记录简体中文分支的本地化、游戏数据与发布维护变更。上游计算器自身的历史请参阅 [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)。

## Unreleased

### Maintenance

- 修正仓库元信息，使 `repository`、`bugs`、`homepage` 指向本仓库，同时保留原作者信息。
- 将应用版本与 Captain of Industry 游戏数据版本分开管理。
- 增加 `data/coi/version.json`，记录 COI 数据版本、数据修订号和导出日期。
- 增加 GitHub Actions CI，对提交执行只读 lint、类型检查和完整构建。
- Release 工作流改为匹配 `zh-cn-*` 标签，并统一发布包名称。
- 源码构建文档统一使用 pnpm，并补充 Git 子模块初始化步骤。

### Maintenance boundaries

以下工作不与常规数据更新混在同一变更中，若未来需要进行，应单独建立分支并独立验证：

- Vue、Vuetify、Vite、TypeScript 等主要依赖的大版本升级。
- 对上游计算器核心计算逻辑或整体目录结构进行重构。
- 引入完整的多语言/i18n 切换框架；当前分支继续采用固定简体中文界面。
- 将 Vite `base` 改为固定站点路径；当前继续保留相对路径，以兼容本地 HTTP 服务和任意静态子路径部署。

## zh-cn-0.8.7b - 2026-09-15

- 面向 Captain of Industry 0.8.7b 重新导出并导入游戏数据。
- 补齐游戏数据相关缺失图标。
- 保持上游计算逻辑、交互方式和数据格式兼容。
- 提供简体中文固定界面及可本地 HTTP 运行的静态发布包。
