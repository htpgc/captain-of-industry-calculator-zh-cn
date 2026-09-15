# Captain of Industry Calculator / Factory Planner (Simplified Chinese)

[简体中文](README.md)

This repository is a Simplified Chinese localization of [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) (MIT, original author Alexey Usov), with refreshed Captain of Industry game data and support for local static-site deployment.

- Repository: <https://github.com/htpgc/captain-of-industry-calculator-zh-cn>
- Upstream: <https://github.com/doubleaxe/daxfb-calculator>
- Application/localization version: `1.0.28-zh.1`
- Captain of Industry data version: **0.8.7b**
- Data revision: `1`
- UI language: fixed Simplified Chinese
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## Differences from upstream

| Item | This repository |
|---|---|
| UI language | Fixed Simplified Chinese; no language switcher |
| COI data | Re-exported and imported for 0.8.7b, including missing icon completion |
| Local usage | Ships a static build suitable for a local HTTP server |
| Maintenance | Application version and COI data version are tracked independently; CI and release workflows are provided |
| Core behavior | Calculator logic, primary interaction, and data format remain as compatible with upstream as practical |

## Versioning

`package.json` tracks the application/localization revision, while `data/coi/version.json` tracks the Captain of Industry game-data version and data revision. Release tags continue to use the `zh-cn-*` family, for example `zh-cn-0.8.7b`. A rebuild or data-only revision for the same game version may use a suffix such as `zh-cn-0.8.7b-r2`.

## Using a release package

Download the newest ZIP from [Releases](https://github.com/htpgc/captain-of-industry-calculator-zh-cn/releases). New automated releases use this naming pattern:

```text
captain-of-industry-calculator-zh-cn-<tag>.zip
```

Because browsers restrict `file://` loading, serve the extracted directory over HTTP instead of double-clicking `index.html`:

```powershell
python -m http.server 8080
# or
npx serve -l 8080
```

Then open:

```text
http://localhost:8080/index.html?gameId=coi
```

The build uses relative paths and therefore remains suitable for local HTTP servers and static-hosting subpaths.

## Building from source

Requirements: Git, Node.js 18 or newer, and Corepack/pnpm.

```powershell
git clone --recurse-submodules https://github.com/htpgc/captain-of-industry-calculator-zh-cn.git
cd captain-of-industry-calculator-zh-cn
corepack enable
pnpm install --frozen-lockfile
pnpm run build
```

For an existing clone:

```powershell
git submodule update --init --recursive
```

Useful commands:

```powershell
pnpm run dev
pnpm run preview
pnpm run lint:check
pnpm run type-check
pnpm run build-data
pnpm run build-docs
pnpm run build-only
```

## Updating Captain of Industry data

The COI exporter is provided as the `data/coi/grabber/captain-of-data` Git submodule. Follow the upstream exporter instructions, update the exported JSON/icons, then run:

```powershell
pnpm exec ts-node data/coi/grabber/grab-data.ts
pnpm run build-data
```

After each data refresh, update `data/coi/version.json`, run `pnpm run lint:check` and `pnpm run build`, and only then create a release tag.

## Maintenance boundaries

Routine localization/data-refresh changes intentionally do not include major Vue/Vuetify/Vite/TypeScript upgrades, broad calculator refactors, a full language-switching i18n framework, or conversion of Vite's relative `base` into a fixed deployment path. Those changes should be developed and validated separately if they become necessary.

## License and credits

This project is derived from [doubleaxe/daxfb-calculator](https://github.com/doubleaxe/daxfb-calculator) and remains under the repository's [MIT License](LICENSE). Original author and copyright attribution are retained.

Simplified Chinese localization and Captain of Industry 0.8.7b data maintenance are provided by [htpgc](https://github.com/htpgc).
