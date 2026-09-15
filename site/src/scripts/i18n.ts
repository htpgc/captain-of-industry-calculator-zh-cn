/*
Added by Marvis: lightweight English/Chinese i18n layer.
Original project: daxfb-calculator by Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
*/
import {ref, type Ref} from 'vue';
import {gameLabelDicts} from './i18n-game-labels';

export type Locale = 'en' | 'zh';

//Modified by Marvis: language switch removed, Chinese only (LOCALES list dropped).
const en: Record<string, string> = {
    // -- game selection --
    'game.select': 'Select game',
    'game.load': 'Load game',
    'game.loadFailed': 'Failed to load game data',
    'game.loadFailed.link': 'Failed to load link',
    'game.loading': 'Loading...',

    // -- toolbar --
    'toolbar.solveGraph': 'Solve graph',
    'toolbar.auto': 'Auto',
    'toolbar.openAnotherWindow': 'Open Another Window',
    'toolbar.toggleSummary': 'Toggle Summary',
    'toolbar.scale': 'Scale',

    // -- main menu --
    'menu.clearAll': 'Clear All',
    'menu.autoLayout': 'Auto Layout Graph',
    'menu.massUpdateCounts': 'Mass Update Counts',
    'menu.settings': 'Settings',
    'menu.help': 'Help',
    'menu.about': 'About',

    // -- settings --
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.language.hint': 'Switch the user interface language.',
    'settings.darkTheme': 'Dark Theme',
    'settings.darkTheme.hint': 'Toggle between dark and light theme.',
    'settings.colorfulLinks': 'Colorful Links',
    'settings.colorfulLinks.hint': 'Draw links in color or black.',
    'settings.countControls': 'Count Controls',
    'settings.countControls.hint': 'Show Plus/Minus buttons on factory card window.',
    'settings.calculations': 'Calculations',
    'settings.solvePrecision': 'Solve Precision',
    'settings.solvePrecision.hint': 'Less number - more preciese calculations of factory io at price of calclation time. Default is ".001".',
    'settings.actions': 'Actions',
    'settings.dragAndDrop': 'Enable Drag And Drop',
    'settings.dragAndDrop.hint': 'When enabled you can drag items from left panel to blueprint, drag links, drag factories. Doesn\'t work on touchscreen devices.',
    'settings.overflowScroll': 'Auto Scroll On Overflow',
    'settings.overflowScroll.hint': 'When enabled blueprint will scroll automatically when anything is dragged ouside of widnow.',
    'settings.dragAndScroll': 'Enable Drag And Scroll',
    'settings.dragAndScroll.hint': 'When enabled you can scroll blueprint by dragging it with mouse. Unusable on touchscreen devices.',
    'settings.dragAndScrollOutside': 'Continue Drag And Scroll Outside',
    'settings.dragAndScrollOutside.hint': 'When enabled drag and scroll will continue if mouse cursor is dragged outside scrollable window. Could be disabled to fight some scroll glitches on Firefox.',
    'settings.pointAndClick': 'Enable Point And Click',
    'settings.pointAndClick.hint': 'When enabled you select items on left panel, links and then paste them with another click. Also factory can be moved the same way with factory menu. Designed for touchscreen devices, but can be used on PC. If both "Enable Drag And Drop" and "Enable Point And Click" is selected, there will be pause before drag started to distinct drag from click.',
    'settings.scrollScale': 'Enable Scale On Wheel',
    'settings.scrollScale.hint': 'When enabled blueprint will scale when mouse wheel is rotated.',
    'settings.save': 'Save (advanced)',
    'settings.compress': 'Compress Saved Data',
    'settings.compress.hint': 'Decreases size for big blueprints.',
    'settings.encode': 'Encode Saved Data',
    'settings.encode.hint': 'Encodes raw blueprint JSON to Base64. Better for sharing blueprint text.',
    'settings.split': 'Split Encoded Data',
    'settings.split.hint': 'Splits to chunks with new line. Better for sharing. Set 0 to disable splitting.',

    // -- main panel / item menu --
    'factory.count': 'Count',
    'factory.delete': 'Delete',
    'factory.deleteAllLinks': 'Delete all links',
    'factory.lock': 'Lock',
    'factory.objective.low': 'Low Priority Objective',
    'factory.objective.primary': 'Primary Objective',
    'factory.objective.secondary': 'Secondary Objective',
    'factory.upgradeMode': 'Upgrade Mode',
    'factory.recipesSearch': 'Search recipes...',

    // -- left toolbox --
    'filter.groupBy': 'Group By',
    'filter.item': 'Item',
    'filter.tier': 'Tier',
    'filter.all': 'All',
    'filter.input': 'Input',
    'filter.output': 'Output',

    // -- layout dialog --
    'layout.title': 'Automatically Layout Blueprint',
    'layout.perform': 'Perform Automatic Layout',
    'layout.edgeSpacing': 'Edge Spacing',
    'layout.horizontalSpacing': 'Horizontal Node Spacing',
    'layout.verticalSpacing': 'Vertical Node Spacing',
    'layout.processor': 'Layout processor',
    'layout.dagre': 'Dagre layout algorithm',
    'layout.elk': 'Elk layout algorithm',

    // -- apply counts dialog --
    'counts.title': 'Apply Factory Counts',
    'counts.autoApply': 'Automatically Apply Factory Counts',
    'counts.roundUp': 'Round to nearest greater integer',
    'counts.setOne': 'Set all counts to 1',
    'counts.setFractional': 'Set fractional counts',

    // -- generate link --
    'link.generate': 'Generate Link',
    'link.generateTitle': 'Generate Link For Blueprint',
    'link.editDescription': 'Edit Blueprint Description',
    'link.embedFileName': 'Embed file name (as a hint) inside generated link',
    'link.generatedLink': 'Generated Link',

    // -- save / share --
    'share.saveShare': 'Save / Share Blueprint',
    'share.saveToFile': 'Save To File',
    'share.copyToClipboard': 'Copy To Clipboard',
    'share.copyBlueprintData': 'Copy Blueprint Data',
    'share.editDescription': 'Edit Blueprint Description',
    'share.target': 'Target',
    'share.share': 'Share',
    'share.loadBlueprint': 'Load Blueprint',
    'share.loadFromFile': 'Load From File',
    'share.pasteFromClipboard': 'Paste From Clipboard',
    'share.pasteBlueprintData': 'Paste Blueprint Data',

    // -- misc dialogs --
    'error.title': 'Error Details',
    'error.warning': 'Warning',
    'error.error': 'Error',
    'error.generateLink': 'Failed to generate link',
    'error.autoLayout': 'Failed to auto layout',
    'error.loadBlueprint': 'Error loading blueprint',
    'error.blueprintPartial': "Blueprint possibly wasn't loaded correctly",
    'link.warning': "Links are intended to be used for sharing blueprints with other people. They were not designed as local file storage replacement. In order to generate link, blueprint data will be uploaded to remote (my) server. I will keep this server online as long as possible, but in the event of failure, all shared blueprints may be lost.",
    'layout.warning': "Automatic layout algorithm is not perfect, it can make blueprint even worse. Currently there is no undo functionality, it is highly recommended to backup blueprint before performing auto layout. Layout libraries are huge, make sure you have enough memory before executing.",
    'about.title': 'About',
    'about.description': 'Calculator/Factory Planner for factory management games.',
    'about.by': 'By doubleaxe (',
    'about.buildVersion': 'Build version',
    'about.buildTime': 'Build time',
    'about.game': 'Game',
    'about.gameVersion': 'Game version',
    'about.changeLog': 'Change log',
    'about.bugReports': 'Bug reports',
    'about.language': 'Language',
};

const zh: Record<string, string> = {
    // -- 游戏选择 --
    'game.select': '选择游戏',
    'game.load': '加载游戏',
    'game.loadFailed': '游戏数据加载失败',
    'game.loadFailed.link': '链接加载失败',
    'game.loading': '加载中...',

    // -- 工具栏 --
    'toolbar.solveGraph': '求解图表',
    'toolbar.auto': '自动',
    'toolbar.openAnotherWindow': '在新窗口打开',
    'toolbar.toggleSummary': '显示/隐藏汇总',
    'toolbar.scale': '缩放',

    // -- 主菜单 --
    'menu.clearAll': '清空全部',
    'menu.autoLayout': '自动布局图表',
    'menu.massUpdateCounts': '批量修改数量',
    'menu.settings': '设置',
    'menu.help': '帮助',
    'menu.about': '关于',

    // -- 设置 --
    'settings.title': '设置',
    'settings.appearance': '外观',
    'settings.language': '语言',
    'settings.language.hint': '切换界面显示语言。',
    'settings.darkTheme': '深色主题',
    'settings.darkTheme.hint': '在深色和浅色主题之间切换。',
    'settings.colorfulLinks': '彩色连线',
    'settings.colorfulLinks.hint': '连线使用彩色或黑色绘制。',
    'settings.countControls': '数量控件',
    'settings.countControls.hint': '在工厂卡片窗口上显示加/减按钮。',
    'settings.calculations': '计算',
    'settings.solvePrecision': '求解精度',
    'settings.solvePrecision.hint': '数值越小，工厂输入/输出的计算越精确，但耗时更长。默认值为 ".001"。',
    'settings.actions': '操作',
    'settings.dragAndDrop': '启用拖放',
    'settings.dragAndDrop.hint': '启用后可将左侧面板中的物品拖到蓝图，也可拖动连线和工厂。触屏设备上不可用。',
    'settings.overflowScroll': '溢出时自动滚动',
    'settings.overflowScroll.hint': '启用后，当内容被拖出窗口范围时，蓝图会自动滚动。',
    'settings.dragAndScroll': '启用拖拽滚动',
    'settings.dragAndScroll.hint': '启用后可用鼠标拖动来滚动画布。触屏设备上不适用。',
    'settings.dragAndScrollOutside': '拖到窗口外继续滚动',
    'settings.dragAndScrollOutside.hint': '启用后，当鼠标拖出可滚动窗口范围时仍继续拖动滚动。若在 Firefox 上遇到滚动异常，可关闭此项。',
    'settings.pointAndClick': '启用点击选中',
    'settings.pointAndClick.hint': '启用后，可在左侧面板选中物品和连线，再点击一次完成粘贴；工厂也可通过工厂菜单按同样方式移动。为触屏设备设计，PC 上同样可用。若同时启用「启用拖放」和「启用点击选中」，拖动开始前会有短暂停顿，以区分拖动与点击。',
    'settings.scrollScale': '启用滚轮缩放',
    'settings.scrollScale.hint': '启用后，滚动画布时可用鼠标滚轮缩放。',
    'settings.save': '保存（高级）',
    'settings.compress': '压缩保存数据',
    'settings.compress.hint': '减小大型蓝图的数据体积。',
    'settings.encode': '编码保存数据',
    'settings.encode.hint': '将蓝图原始 JSON 编码为 Base64。更便于分享蓝图文本。',
    'settings.split': '分割编码数据',
    'settings.split.hint': '按换行分割成多段，便于分享。设为 0 则不分割。',

    // -- 主面板 / 工厂菜单 --
    'factory.count': '数量',
    'factory.delete': '删除',
    'factory.deleteAllLinks': '删除所有连线',
    'factory.lock': '锁定',
    'factory.objective.low': '低优先级目标',
    'factory.objective.primary': '主要目标',
    'factory.objective.secondary': '次要目标',
    'factory.upgradeMode': '升级模式',
    'factory.recipesSearch': '搜索配方...',

    // -- 左侧面板 --
    'filter.groupBy': '分组方式',
    'filter.item': '物品',
    'filter.tier': '层级',
    'filter.all': '全部',
    'filter.input': '输入',
    'filter.output': '输出',

    // -- 布局对话框 --
    'layout.title': '自动布局蓝图',
    'layout.perform': '执行自动布局',
    'layout.edgeSpacing': '连线间距',
    'layout.horizontalSpacing': '水平节点间距',
    'layout.verticalSpacing': '垂直节点间距',
    'layout.processor': '布局处理器',
    'layout.dagre': 'Dagre 布局算法',
    'layout.elk': 'Elk 布局算法',

    // -- 批量数量对话框 --
    'counts.title': '应用工厂数量',
    'counts.autoApply': '自动应用工厂数量',
    'counts.roundUp': '向上取整',
    'counts.setOne': '将所有数量设为 1',
    'counts.setFractional': '保留小数数量',

    // -- 生成链接 --
    'link.generate': '生成链接',
    'link.generateTitle': '为蓝图生成链接',
    'link.editDescription': '编辑蓝图描述',
    'link.embedFileName': '在生成的链接中嵌入文件名（作为提示）',
    'link.generatedLink': '生成的链接',

    // -- 保存 / 分享 --
    'share.saveShare': '保存 / 分享蓝图',
    'share.saveToFile': '保存到文件',
    'share.copyToClipboard': '复制到剪贴板',
    'share.copyBlueprintData': '复制蓝图数据',
    'share.editDescription': '编辑蓝图描述',
    'share.target': '目标',
    'share.share': '分享',
    'share.loadBlueprint': '加载蓝图',
    'share.loadFromFile': '从文件加载',
    'share.pasteFromClipboard': '从剪贴板粘贴',
    'share.pasteBlueprintData': '粘贴蓝图数据',

    // -- 其他对话框 --
    'error.title': '错误详情',
    'error.warning': '警告',
    'error.error': '错误',
    'error.generateLink': '生成链接失败',
    'error.autoLayout': '自动布局失败',
    'error.loadBlueprint': '蓝图加载出错',
    'error.blueprintPartial': '蓝图可能未完整加载',
    'link.warning': "链接用于与他人分享蓝图，并非作为本地文件存储的替代方案。生成链接时，蓝图数据会被上传到远程（作者）服务器。作者会尽量保持服务器在线，但一旦服务器故障，所有已分享的蓝图都可能丢失。",
    'layout.warning': "自动布局算法并不完美，可能使蓝图变得更糟。当前没有撤销功能，强烈建议在执行自动布局前备份蓝图。布局库体积较大，执行前请确认内容充足。",
    'about.title': '关于',
    'about.description': '面向工厂管理游戏的计算器 / 工厂规划器。',
    'about.by': '作者 doubleaxe (',
    'about.reworkedBy': '翻译 / 二次开发 htpgc (',
    'about.buildVersion': '构建版本',
    'about.buildTime': '构建时间',
    'about.game': '游戏',
    'about.gameVersion': '游戏版本',
    'about.changeLog': '更新日志',
    'about.bugReports': '问题反馈',
    'about.language': '语言',
};

export const messages: Record<Locale, Record<string, string>> = {en, zh};

//Modified by Marvis: language switch removed, Chinese only.
export const locale: Ref<Locale> = ref<Locale>('zh');

export function applyDocumentLang(value: Locale) {
    try {
        document.documentElement.lang = (value === 'zh') ? 'zh-CN' : 'en';
    } catch(err) {
        //no-op
    }
}

export function setLocale(value: Locale) {
    locale.value = value;
    applyDocumentLang(value);
}

export function t(key: string, params?: Record<string, string | number>): string {
    const dict = messages[locale.value] || messages.en;
    let text = dict[key];
    if(text === undefined)
        text = messages.en[key];
    if(text === undefined)
        return key;
    if(params) {
        for(const [k, v] of Object.entries(params))
            text = text.split(`{${k}}`).join(String(v));
    }
    return text;
}

//Added by Marvis: translate in-game data names (items / recipes / factories / logistics).
//Reads locale.value, so any component using it re-renders on language switch.
export function translateGameLabel(game: string, label: string): string {
    if(!label || (locale.value === 'en'))
        return label;
    const dict = gameLabelDicts[game];
    const translated = dict && dict[label];
    return translated || label;
}

export function useI18n() {
    return {t, locale, setLocale};
}
