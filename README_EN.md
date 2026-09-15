# Captain of Industry Calculator / Factory Planner (Simplified Chinese Edition)

[中文](README.md) | [English](README_EN.md)

This repository is a **Simplified Chinese community-maintained edition of Captain of Industry**, based on [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) under the MIT License.

The project focuses exclusively on Captain of Industry and provides a Simplified Chinese UI, updated game data, improved production-chain interactions, and a standalone local release package.

- Current version: **v1.1.0**
- Game data version: Captain of Industry **0.8.7b**
- UI language: **Simplified Chinese**
- Online version: <https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>
- Upstream project: [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)
- Data exporter: [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data)

## Highlights

| Item | Description |
|---|---|
| Project focus | Simplified Chinese community-maintained edition focused on Captain of Industry |
| Default game | Captain of Industry loads automatically; no game selection page is required |
| Game data | Updated to Captain of Industry 0.8.7b with several missing icons completed |
| Source / destination menu | Click a material icon to see buildings that can produce or consume that material |
| Quick linking | Drag a material port into empty space, then choose a source or destination building and link it automatically |
| Storage matching | Matching storage is offered automatically by material type: loose, fluid, or countable |
| Bidirectional storage | Newly added storage uses the InOut recipe so both input and output remain available for further chaining |
| Release contents | Production releases include Captain of Industry only; Evospace and Sample Game are no longer included |
| Local use | Extract the Release package and open `index.html` directly; no local server is required |
| Offline use | Required scripts, styles, data, and icons are bundled in the release package for offline use |
| Documentation | Simplified Chinese help documentation is included; Chinese and English READMEs are maintained separately |
| Core logic | Core calculation logic and the primary interaction model remain based on the upstream project, with additional localization and interaction improvements |

## What's new in v1.1.0

- Added quick source/destination menus for material ports:
  - click an input material icon to open the `Add producing factory` menu;
  - click an output material icon to open the `Add consuming factory` menu.
- Kept and improved the existing workflow of dragging a material port into empty space to add a source or destination building.
- Source and destination menus now add matching storage automatically by material type:
  - Loose → **Loose Storage**;
  - Fluid → **Fluid Storage**;
  - Countable → **Unit Storage**.
- Added abstract material type matching for `AnyLooseProduct`, `AnyFluidProduct`, and `AnyCountableProduct`.
- Selecting storage now creates and links it automatically, while the abstract material is materialized into the actual product, such as coal, slag, diesel, and so on.
- Storage nodes use the `InOut` recipe, leaving both input and output available for continuing the production chain.

## Download and use

Go to [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases) and download the latest stable package.

Recommended file:

```text
captain-of-industry-calculator-zh-cn-v1.1.0.zip
```

After extracting the archive, simply open:

```text
index.html
```

The Captain of Industry calculator will open directly in your browser.

**No Node.js, Python, or other runtime environment is required, and you do not need to start a local HTTP server.**

Main release structure:

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

## Online version

GitHub Pages:

<https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>

## Building from source

### Requirements

- Node.js 18 or later
- pnpm 8.3.1
- Git, if you want to clone the Captain of Industry data exporter submodule as well

### Clone the repository

```bash
git clone --recurse-submodules https://github.com/htpgc/captain-of-industry-calculator-zh-cn.git
cd captain-of-industry-calculator-zh-cn
```

### Install dependencies and build

```bash
pnpm install
pnpm run build
```

On Windows PowerShell, if script execution policy blocks the `pnpm` shim, use:

```powershell
pnpm.cmd install
pnpm.cmd build
```

Build output is written to:

```text
dist/
```

The contents of `dist` are the final files that can be packaged for release. You can also open `dist/index.html` directly for local use.

Development mode:

```bash
pnpm run dev
```

Preview the production build:

```bash
pnpm run preview
```

## Updating Captain of Industry data

Captain of Industry game data is exported using:

<https://github.com/doubleaxe/captain-of-data>

Submodule path:

```text
data/coi/grabber/captain-of-data
```

After updating the exported JSON files and icon resources, run:

```bash
npx ts-node data/coi/grabber/grab-data.ts
pnpm run build-data
```

`site/data/types/game-list.json` currently contains only `coi`, so production builds generate Captain of Industry data only.

## Help documentation

The Simplified Chinese user guide is located at:

```text
docs/README.md
```

After a production build it is available under:

```text
docs/
```

## Main technology stack

- Vue 3
- Vuetify 3
- Vite
- TypeScript
- dagre / elkjs
- d3-shape
- @ellbur/javascript-lp-solver
- pako / js-base64
- systemjs

## License and credits

This project is based on [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) and continues to use the [MIT License](LICENSE).

The original project is copyrighted by Alexey Usov (doubleaxe). The core calculation logic and primary interaction model come from the upstream project.

Captain of Industry game data is exported with [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data). Simplified Chinese localization, 0.8.7b data maintenance, icon completion, interaction improvements, and release maintenance are provided by [htpgc](https://github.com/htpgc).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.
