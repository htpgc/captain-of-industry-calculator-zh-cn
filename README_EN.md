# Captain of Industry Calculator / Factory Planner (Simplified Chinese Edition)

[中文](README.md) | [English](README_EN.md)

This repository is a **Simplified Chinese community-maintained edition for Captain of Industry**, based on [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) under the MIT License.

The current version focuses on Captain of Industry only. Evospace and Sample Game are no longer included in releases.

- Upstream project: [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator)
- Data exporter: [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data)
- Game data version: Captain of Industry **0.8.7b**
- UI language: Simplified Chinese only
- Online version: <https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>

## Main differences from upstream

| Item | Description |
|---|---|
| Project focus | Community-maintained Simplified Chinese edition focused on Captain of Industry |
| UI language | Simplified Chinese only; language switcher removed |
| Default game | Captain of Industry loads automatically without a game selection page |
| Game data | Captain of Industry 0.8.7b data re-exported and re-imported, with missing icons completed |
| Release contents | Releases include Captain of Industry only; Evospace and Sample Game are no longer packaged |
| Offline use | No external CDN dependency; works offline through a local HTTP server |
| Core logic | Core calculation logic and primary interaction model remain based on the upstream project |

## Using a Release package

The release archive contains a pre-built static site, so you do **not** need to install dependencies or rebuild it. Because browsers restrict the `file://` protocol, do not open `index.html` directly; serve the extracted folder through a local HTTP server instead.

### 1. Download and extract

Download the latest package from [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases), for example:

```text
captain-of-industry-calculator-zh-cn-v1.0.0.zip
```

Main files after extraction:

```text
index.html        Entry page
assets/           Scripts and styles
docs/             Simplified Chinese help documentation
games/coi/        Captain of Industry data package
favicon.ico
```

### 2. Start a local static server

Open a terminal in the extracted directory:

```powershell
# Python
python -m http.server 8080

# or Node.js
npx serve -l 8080
```

Then open:

```text
http://localhost:8080/
```

Captain of Industry loads automatically.

The legacy parameter is still supported:

```text
http://localhost:8080/?gameId=coi
```

### 3. Fully offline use

All required scripts, styles, game data, and icons are included in the release archive. The external polyfill CDN has been removed, so after starting the local HTTP server the application can run without internet access.

## GitHub Pages / static hosting

The build uses relative paths and can be deployed to GitHub Pages, Nginx, Apache, or other static hosting services.

Project Pages URL:

<https://htpgc.github.io/captain-of-industry-calculator-zh-cn/>

## Building from source

Requirements:

- Node.js 18 or later
- pnpm 8.3.1
- Git, if you want the Captain of Industry exporter submodule checked out

Clone the repository:

```bash
git clone --recurse-submodules https://github.com/htpgc/captain-of-industry-calculator-zh-cn.git
cd captain-of-industry-calculator-zh-cn
```

Install dependencies and build:

```bash
pnpm install
pnpm run build
```

Build output is written to:

```text
dist/
```

For development:

```bash
pnpm run dev
```

Preview a production build:

```bash
pnpm run preview
```

## Updating Captain of Industry data

Captain of Industry data is exported with:

<https://github.com/doubleaxe/captain-of-data>

Submodule path:

```text
data/coi/grabber/captain-of-data
```

Follow the upstream instructions to build and run the exporter, update the exported JSON files and icons, then run:

```bash
npx ts-node data/coi/grabber/grab-data.ts
pnpm run build-data
```

`site/data/types/game-list.json` contains only `coi`, so production builds generate only:

```text
site/public/games/coi/
```

## Help documentation

The Simplified Chinese user guide is located at:

```text
docs/README.md
```

After building, it is available at:

```text
/docs/
```

## Main technology stack

- Vue 3
- Vuetify 3
- Vite
- dagre / elkjs
- d3-shape
- @ellbur/javascript-lp-solver
- pako / js-base64
- systemjs
- TypeScript

## License and credits

This project is based on [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) and continues to use the [MIT License](LICENSE).

The original project is copyrighted by Alexey Usov (doubleaxe). The core calculation logic and primary interaction model come from the upstream project.

Captain of Industry game data is exported using [doubleaxe/captain-of-data](https://github.com/doubleaxe/captain-of-data). Simplified Chinese localization, Captain of Industry 0.8.7b data re-import, icon completion, and release maintenance are provided by [htpgc](https://github.com/htpgc).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed changes.
