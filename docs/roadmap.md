# Roadmap

Public backlog for **glsl-helpers-react**, organized in **phases** (P0–P5). **P** means **phase**, not priority — though phases are ordered by priority (P0 first). **P0–P2** map to the **2.x** line (`2.n.x` minors); **P3–P5** are **major** releases (`3.0.x`, `4.0.x`, `5.0.x`). Within a line, patch releases (`2.1.0`, `2.1.1`, …) group related items. Items are aspirational until checked off in a release or PR.

**How to read phases**

| Phase | Version line | Focus |
|-------|--------------|--------|
| **P0** | `2.0.x` | Ship, legal clarity, repo hygiene |
| **P1** | `2.1.x` | Demos, discoverability, developer experience |
| **P2** | `2.2.x` | Framework-agnostic core (large release) |
| **P3** | `3.0.x` | Svelte adapter (major release) |
| **P4** | `4.0.x` | WASM / CDN distribution (major release) |
| **P5** | `5.0.x` | Additional framework adapters (major release) |

---

## Summary

**Version column:** Done rows link to [changelog](changelog/README.md) entries (`2.0.0`, `2.0.1`, …). Planned rows show the target version only.

| Version | Item | Status |
|---------|------|--------|
| [2.0.0](changelog/2.0.0.md) | [Package rebrand (`glsl-helpers-react`)](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [`GlslCanvas` + deprecated `ShadertoyReact` alias](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [React 17–19 peer support](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [WebGL2 / GLSL 3.00 (`webgl` prop)](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [Reactive prop updates](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [`defines` prop](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [Extended textures (camera, data, cube, keyboard, `srcSet`)](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [`iChannelTime` uniform](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [Multi-pass rendering (`passes`)](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [`persistentTime` / `iPersistentTime`](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [TypeScript definitions](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [Webpack 5 / modern build toolchain](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [2.0 docs (migration, textures, multi-pass, changelog)](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [2.0 example demos](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [WebGL2 `internalFormat` + multi-pass channel fixes](#completed--fork-from-shadertoy-react-1112) | Done |
| [2.0.0](changelog/2.0.0.md) | [Release 2.0.0](#release-200) | Done |
| [2.0.1](changelog/2.0.1.md) | [Release 2.0.1 hygiene](#release-201) | Done |
| [2.0.1](changelog/2.0.1.md) | [Docs Obsidian vault](#docs-obsidian-vault) | Done |
| [2.0.1](changelog/2.0.1.md) | [CONTRIBUTING.md](#contributingmd) | Done |
| [2.0.1](changelog/2.0.1.md) | [ISSUES.md](#issuesmd) | Done |
| [2.0.1](changelog/2.0.1.md) | [License naming clarification](#license-naming-clarification) | Done |
| `2.0.1` | [Delete stale remote branches](#delete-stale-remote-branches) | Partial |
| [2.1.0](changelog/2.1.0.md) | [Demo mouse, scaling, and upside-down output](#demo-mouse-scaling-and-upside-down-output) | Done |
| [2.1.0](changelog/2.1.0.md) | [Demo grid scroll discoverability](#demo-grid-scroll-discoverability) | Done |
| [2.1.1](changelog/2.1.1.md) | [README badges and Playground section](#readme-badges-and-playground) | Done |
| [2.1.1](changelog/2.1.1.md) | [Examples refactor (TSX + `.frag`)](#examples-refactor-tsx--frag) | Done |
| [2.1.1](changelog/2.1.1.md) | [StackBlitz playground](#stackblitz-playground) | Done |
| [2.1.1](changelog/2.1.1.md) | [Three-tier demo model in README](#three-tier-demo-model) | Done |
| [2.1.1](changelog/2.1.1.md) | [GitHub Pages demo deploy](#github-pages-demo-deploy) | Partial |
| [2.1.2](changelog/2.1.2.md) | [Library render fixes (2.1.2)](#library-render-fixes-212) | Partial |
| [2.1.2](changelog/2.1.2.md) | [Visual regression for examples](#visual-regression-for-examples) | Partial |
| [2.1.2](changelog/2.1.2.md) | [Demo sandbox (upstream CodeSandbox layout)](#demo-sandbox-upstream-codesandbox-layout) | Done |
| [2.1.2](changelog/2.1.2.md) | [StackBlitz demo-sandbox import fix](#stackblitz-demo-sandbox-import-fix) | Done |
| `2.1.2` | [Release 2.1.2 (merge + publish)](#release-212) | Partial |
| `2.1.4` | [CI on pull requests](#ci-on-pull-requests) | Partial |
| `2.1.3` | [SECURITY.md](#securitymd) | Planned |
| `2.1.3` | [Deprecate `shadertoy-react-19` on npm](#deprecate-shadertoy-react-19-on-npm) | Planned |
| `2.1.3` | [ESM `exports` map](#esm-exports-map) | Planned |
| `2.1.4` | [Dependabot](#dependabot) | Planned |
| `2.1.4` | [Automated tests](#automated-tests) | Planned |
| `2.1.5` | [Framework cookbooks](#framework-cookbooks) | Planned |
| `2.1.5` | [React Three Fiber bridge doc](#react-three-fiber-bridge-doc) | Planned |
| `2.1.5` | [Bundle size budget](#bundle-size-budget) | Planned |
| `2.1.5` | [Custom GLSL-oriented examples](#custom-glsl-oriented-examples) | Planned |
| `2.2.0` | [Framework-agnostic core](#framework-agnostic-core) | Planned |
| `3.0.0` | [Svelte version](#svelte-version) | Planned |
| `4.0.0` | [WASM / CDN distribution](#wasm--cdn-distribution) | Needs Request for Comments |
| `5.0.0` | [Additional framework adapters](#additional-framework-adapters) | Planned |

---

## `2.0.x` (P0) — Ship and repo hygiene

### Completed — fork from shadertoy-react 1.1.2

**Baseline:** [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react) **v1.1.2** — `ShadertoyReact`, React **16**, WebGL **1** only, image/video textures, no live prop updates.

**Shipped:** `glsl-helpers-react` **v2.0.0** on npm and `main` ([`v2.0.0`](https://github.com/HenriqueStelzer/glsl-helpers-react/releases/tag/v2.0.0)).

| Item | Notes |
|------|--------|
| Package rebrand (`glsl-helpers-react`) | npm name, `lib/glsl-helpers-react.min.js` |
| `GlslCanvas` + deprecated `ShadertoyReact` alias | New default export; legacy alias kept |
| React 17–19 peer support | Was React 16 only |
| WebGL2 / GLSL 3.00 (`webgl` prop) | `webgl="auto" \| "1" \| "2"`; shader preprocess |
| Reactive prop updates | `fs`, `vs`, `textures`, `defines`, `passes`, `uniforms`, `precision` without remount |
| `defines` prop | Inject `#define` constants from React (in addition to `DPR`) |
| Extended textures | Camera, `rgba8` / `rgba32f` data, cube maps, keyboard, responsive `srcSet` |
| `iChannelTime` uniform | Per-channel playback time for video / camera |
| Multi-pass rendering (`passes`) | `FramebufferPool`, buffer pipelines |
| `persistentTime` / `iPersistentTime` | Opt-in epoch clock via localStorage |
| TypeScript definitions | `lib/index.d.ts` |
| Webpack 5 / modern build toolchain | Babel 7.26, webpack-dev-server 5 |
| 2.0 docs | [migration-2.0.md](migration-2.0.md), [roadmap](roadmap.md), textures, multi-pass, uniforms, troubleshooting, [changelog](changelog/README.md) |
| 2.0 example demos | Camera, cube, data texture, multi-pass, persistent time, srcSet tiles |
| WebGL2 `internalFormat` + multi-pass channel fixes | Sized `RGBA8`/`RGBA32F`; `iChannel` offset when `inputs` + textures coexist; empty `srcSet` fallback |

---

### Release 2.0.0

**Goal:** Ship `glsl-helpers-react@2.0.0` to npm.

**Status:** Done — published; tag [`v2.0.0`](https://github.com/HenriqueStelzer/glsl-helpers-react/releases/tag/v2.0.0).

**Version log:** [changelog/2.0.0.md](changelog/2.0.0.md) · [full index](changelog/README.md)

**Deliverables**

- [x] Merge 2.0 release branch into `main`
- [x] Copilot review fixes (reactive props, WebGL2 formats, multi-pass channels)
- [x] Roadmap and changelog docs on `main`
- [x] `npm publish` as `glsl-helpers-react@2.0.0`

---

### Release 2.0.1

**Goal:** Repo hygiene and contributor onboarding — no demo or API changes.

**Target npm version:** `2.0.1` (patch — docs and repo files only).

**Status:** Done (unpublished on npm).

**Version log:** [changelog/2.0.1.md](changelog/2.0.1.md) · [full index](changelog/README.md)

| Item | Section |
|------|---------|
| [Docs Obsidian vault](#docs-obsidian-vault) | Wikilink-friendly docs vault |
| [CONTRIBUTING.md](#contributingmd) | Contributor workflow |
| [ISSUES.md](#issuesmd) | Bug-report expectations |
| [License naming clarification](#license-naming-clarification) | Single canonical `LICENSE` |

---

### Docs Obsidian vault

**Target:** `2.0.1`

**Goal:** Make `docs/` browsable as an Obsidian vault with wikilinks and graph view.

**Why:** Documentation lives in `docs/`; a committed `.obsidian/` config lets contributors open the folder as a vault in Obsidian Desktop or preview links in editors with the Obsidian Preview extension.

**Deliverables**

- [x] `docs/.obsidian/` minimal committed config; workspace/cache gitignored
- [x] CONTRIBUTING note: how to open `docs/` as a vault in Obsidian Desktop

**Depends on:** None

---

### CONTRIBUTING.md

**Target:** `2.0.1`

**Goal:** Onboard contributors with fork-specific workflow.

**Why:** No contributor guide exists today; issue templates are still generic upstream copies.

**Deliverables**

- Branch naming and PR expectations
- Before opening a PR: `npm run transpile`, `npm run build`, rebuild `examples/dist` when examples change
- Regenerate changelog when version-bump commits change: `npm run changelog`
- Conventional commit style (as used on `main`)
- Credit [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react) for 1.x history
- PR checklist: TypeScript defs present in `lib/index.d.ts`

**Depends on:** None

---

### ISSUES.md

**Target:** `2.0.1`

**Goal:** Tell reporters what we need to reproduce WebGL issues quickly.

**Why:** GitHub only has generic [bug](../.github/ISSUE_TEMPLATE/bug_report.md) and [feature](../.github/ISSUE_TEMPLATE/feature_request.md) templates with no fork branding.

**Deliverables**

- Top-level `ISSUES.md` (GitHub discoverability) linked from README
- When to use bug vs feature template
- Required info for shader bugs: browser, OS, GPU (if known), `webgl` prop value, minimal `fs` repro, full console compile/link log
- Link to [troubleshooting](troubleshooting.md)
- Sub-task: refresh `.github/ISSUE_TEMPLATE/*.md` to mention `glsl-helpers-react` / `GlslCanvas`

**Depends on:** None

---

### License naming clarification

**Target:** `2.0.1`

**Goal:** One canonical MIT license file and clear attribution docs.

**Why:** Repo has both `LICENSE` (dual copyright, fork) and `LICENCE.txt` (upstream-only, British spelling). README points only to `LICENSE`.

**Deliverables**

- Canonical file: `LICENSE` (keep dual copyright line)
- Remove `LICENCE.txt` or replace with a one-line pointer to `LICENSE`
- Document in README + CONTRIBUTING: MIT for the package; upstream © Morgan Villedieu preserved
- Call out **shader content** licenses separately (e.g. `examples/src/shaders/mouse.js` is CC BY-NC-SA) — not the npm package license

**Depends on:** CONTRIBUTING.md (cross-link)

---

### Delete stale remote branches

**Target:** `2.0.1`

**Goal:** Clean GitHub branch list after merge.

**Status:** `release/2.0.0` removed. `modernize-react-webgl2` and merged doc branches may still exist on remote.

**Branches safe to delete (no unique code):**

- `modernize-react-webgl2` — merged via PR #1
- `chore/changelog-2.0.1-alignment`, `release/2.0.1` — after doc PRs merge

**Depends on:** None

---

## `2.1.x` (P1) — Demos, discoverability, and developer experience

**Line status (2026-06-09):** `2.1.0` and `2.1.1` merged to `main` via [PR #10](https://github.com/HenriqueStelzer/glsl-helpers-react/pull/10). Sandbox tier work is on **`test/sandbox-playground`** (6 commits ahead of `main`; 2 commits not yet on `origin/test/sandbox-playground`). **`2.1.2` library fixes, Playwright CI, and changelog are in the local working tree only** — not committed on any branch yet. [`feature/2.1.x`](https://github.com/HenriqueStelzer/glsl-helpers-react/tree/feature/2.1.x) is merged; branch tip is stale.

| Version | Branch / location | Merged to `main` | npm publish | GitHub Pages |
|---------|-------------------|------------------|-------------|--------------|
| **2.1.0** | `main` | Yes (PR #10) | Pending | Bundled in live demo |
| **2.1.1** | `main` (`package.json` **2.1.1**) | Yes (PR #10) | Pending | **Live** — `origin/gh-pages` `bundle.js` hash matches `main:examples/dist/bundle.js` |
| **2.1.2** | Uncommitted working tree + docs on `test/sandbox-playground` | No | Pending | Not deployed — rebuild needed after lib commit + `publish-demo` |

### Branch divergence

| Branch | Tip (local) | vs `main` | Notes |
|--------|-------------|-----------|--------|
| **`main`** | `be8374d` — merge PR #10 | — | Examples refactor, scroll UX, `iMouse` fix; `sandbox/basic` + `sandbox/demos` (pre-rename) |
| **`feature/2.1.x`** | `ea66a43` | Behind `main` (merged) | Safe to delete after hygiene pass |
| **`test/sandbox-playground`** | `e865be9` | **+6 commits** (sandbox/README/roadmap only) | Playground + demo-sandbox router, StackBlitz vite fix; **no `src/` commits yet** |
| **`origin/gh-pages`** | `6354825` | Unrelated history | Deploy branch: `bundle.js` + `index.html` at repo root; bundle **identical** to `main` examples build (2.1.1) |

**Uncommitted local work (not on any branch):** `src/index.jsx`, `src/Texture.js` (ResizeObserver, `toGlFlipY`, texture compile deferral, multi-pass `iChannel` injection), `package.json` **2.1.2**, Playwright (`playwright.config.ts`, `tests/visual/`), `.github/workflows/ci.yml`, `docs/changelog/2.1.2.md`, rebuilt `examples/dist/`, `docs/textures.md`. Commit these before merge or npm publish.

**StackBlitz / upside-down textures:** Demo sandbox resolves `glsl-helpers-react` from **npm** (`^2.1.0`). Texture orientation and canvas sizing fixes exist only in the uncommitted working tree — StackBlitz `/Textures` and live GitHub Pages will stay upside-down or black until **2.1.2** is committed, transpiled, published to npm, and (for Pages) `npm run publish-demo`.

### Three-tier demo model

The fork documents three distinct demo surfaces. **Our README links use StackBlitz only**; upstream CodeSandbox URLs are attribution references for the original [shadertoy-react](https://github.com/mvilledieu/shadertoy-react) experience.

| Tier | Location | Structure | Try it |
|------|----------|-----------|--------|
| **Playground** | [`sandbox/playground`](../sandbox/playground/) | Single annotated `.frag`, minimal `GlslCanvas` | [StackBlitz](https://stackblitz.com/github/HenriqueStelzer/glsl-helpers-react/tree/test/sandbox-playground/sandbox/playground) |
| **Demo sandbox** | [`sandbox/demo-sandbox`](../sandbox/demo-sandbox/) | Fullscreen one shader per route; **+ More** dropdown; React Router — matches [upstream CodeSandbox Demos](https://codesandbox.io/s/434qm4x4w0) | [StackBlitz](https://stackblitz.com/github/HenriqueStelzer/glsl-helpers-react/tree/test/sandbox-playground/sandbox/demo-sandbox) |
| **Demo** | [`examples/`](../examples/) → GitHub Pages | **15-tile** scrolling grid + JumpNav + scroll cue — expanded from [upstream `examples/`](https://github.com/mvilledieu/shadertoy-react/tree/master/examples) | [Live demo](https://henriquestelzer.github.io/glsl-helpers-react/) · `npm start` |

**StackBlitz branch note:** Until `test/sandbox-playground` merges to `main`, StackBlitz URLs must use `tree/test/sandbox-playground/sandbox/…`. After merge, switch README links to `tree/main/sandbox/…`.

---

### `2.1.0` — Demo fixes

**Status:** Done — merged to `main` ([changelog/2.1.0.md](changelog/2.1.0.md)).

#### Demo mouse, scaling, and upside-down output

**Goal:** Fix incorrect `iMouse` coordinates, canvas scaling, and flipped/upside-down rendering in the example demos.

**Why:** Mouse-driven examples report wrong positions when the canvas is CSS-scaled, offset from the viewport origin, or affected by `devicePixelRatio`.

**Deliverables**

- [x] Correct mouse coordinate mapping: backing-store pixels (`CSS × devicePixelRatio`), matching `iResolution`
- [x] `toShaderPixelCoords()` helper in `GlslCanvas`
- [x] Verify mouse demos at multiple DPR values
- [x] [uniforms.md](uniforms.md) and [troubleshooting.md](troubleshooting.md) updated

**Depends on:** None

---

#### Demo grid scroll discoverability

**Goal:** Make it obvious that the local demo grid scrolls and contains more than one viewport of examples.

**Deliverables**

- [x] Bottom gradient fade and “scroll for more demos” cue
- [x] Sticky jump menu with anchor links per tile (`#demo-*`)
- [x] Verify on mobile and short viewports

**Depends on:** None

---

### `2.1.1` — Demo platform

**Status:** Done — merged to `main` ([changelog/2.1.1.md](changelog/2.1.1.md)).

#### README badges and Playground section

**Goal:** README header matches upstream polish — npm/size badges plus one-click links to key docs and sandboxes.

**Deliverables**

- [x] npm version + gzip bundle size badges
- [x] Shield badges for roadmap, changelog, migration, textures, multi-pass, uniforms, troubleshooting, CONTRIBUTING, ISSUES
- [x] Playground, Demo, and Demo sandbox sections with StackBlitz links

**Depends on:** [StackBlitz playground](#stackblitz-playground)

---

#### Examples refactor (TSX + `.frag`)

**Goal:** Split inline shader strings into maintainable `.frag` files and TypeScript/React tile components.

**Deliverables**

- [x] One `.frag` file per demo shader under `examples/src/shaders/`
- [x] TypeScript tile components (`examples/src/tiles/`) importing frag via webpack `asset/source`
- [x] Migrate `examples/src/index.jsx` → `index.tsx`
- [x] Webpack/babel TypeScript + `.frag` imports

**Depends on:** None

---

#### StackBlitz playground

**Goal:** Live browser sandboxes matching upstream’s “try it now” experience — **StackBlitz only** in our docs (no fork CodeSandbox links).

**Why:** [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react) README linked to live CodeSandbox templates ([Basic](https://codesandbox.io/s/ojllzxvww6), [Demos](https://codesandbox.io/s/434qm4x4w0)); the fork mirrors that UX via StackBlitz + Vite sandboxes.

**Status:** Done — [`sandbox/playground`](../sandbox/playground/) shipped in `2.1.1`; demo-sandbox router layout landed in `2.1.2` on `test/sandbox-playground`.

**Deliverables**

- [x] **Playground** — minimal fullscreen `GlslCanvas` + one annotated `.frag`
- [x] README [Playground](../README.md#playground) section with StackBlitz link
- [x] Vite + `glsl-helpers-react` from npm (`^2.1.0`)

**Depends on:** [Examples refactor (TSX + `.frag`)](#examples-refactor-tsx--frag) (recommended)

---

#### Three-tier demo model

**Goal:** README clearly separates Playground, Demo sandbox, and Demo (15-tile grid).

**Deliverables**

- [x] Three README sections with badges and StackBlitz / GitHub Pages links
- [x] Upstream CodeSandbox / `examples/` cited as attribution only

**Depends on:** [StackBlitz playground](#stackblitz-playground), [Demo sandbox](#demo-sandbox-upstream-codesandbox-layout)

---

#### GitHub Pages demo deploy

**Goal:** Live demo at `homepage` URL.

**Status:** Partial — site is **live and matches `main`** (`origin/gh-pages` `bundle.js` ≡ `main:examples/dist/bundle.js`, 2.1.1 build). Still missing **2.1.2** library fixes (texture `flipY`, ResizeObserver, multi-pass channels) until working-tree `src/` changes are committed, transpiled, examples rebuilt, and `publish-demo` run.

**Deliverables**

- [x] `package.json` `homepage` → GitHub Pages URL
- [x] Document deploy steps in CONTRIBUTING.md
- [x] Initial deploy to `origin/gh-pages` (live at [henriquestelzer.github.io/glsl-helpers-react](https://henriquestelzer.github.io/glsl-helpers-react/))
- [ ] Commit + merge `2.1.2` library fixes; `npm run transpile` + `npm run build`
- [ ] Push updated `examples/dist` to `gh-pages` (`npm run publish-demo`)
- [ ] Re-deploy after `2.1.2` npm publish so StackBlitz sandboxes pick up texture / canvas fixes

**Depends on:** [Release 2.1.2](#release-212)

---

### `2.1.2` — Demo quality and render fixes

**Status:** **In progress** — sandbox tier committed on `test/sandbox-playground`; library fixes, Playwright, and CI exist in the **local working tree only** (uncommitted). See [changelog/2.1.2.md](changelog/2.1.2.md). Pending commit, merge to `main`, and npm publish.

#### Library render fixes (2.1.2)

**Goal:** Fix canvas sizing, mouse coords, texture orientation, and multi-pass compile errors discovered during visual QA.

**Deliverables**

- [ ] Commit to branch: `syncCanvasSize()` + `ResizeObserver` — backing store tracks CSS layout × `devicePixelRatio`
- [ ] Commit to branch: `toShaderPixelCoords()` — mouse uses canvas width/height vs layout rect (not DPR alone)
- [ ] Commit to branch: defer shader compile when `textures.length > 0` until load completes
- [ ] Commit to branch: `toGlFlipY()` in `Texture.js` — correct upside-down image textures (fixes demo-sandbox `/Textures` on npm)
- [ ] Commit to branch: multi-pass inject `sampler2D iChannelN` for pass `inputs` (fixes final-pass compile errors)
- [x] [textures.md](textures.md) — `flipY` behavior documented (local edit)

**Note:** Code is implemented locally; checkboxes above track **git commit**, not authorship. StackBlitz sandboxes resolve `glsl-helpers-react` from **npm** until **`2.1.2` is published**. Local monorepo dev: `LOCAL_GLSL_LIB=1 npm run dev` in `sandbox/demo-sandbox` after `npm run transpile`.

**Depends on:** None

---

#### Visual regression for examples

**Goal:** Catch GPU/render regressions in the demo grid.

**Deliverables**

- [ ] Commit to branch: Playwright config (`playwright.config.ts`) — serves `examples/dist` on `:3001`, viewport 1440×900
- [ ] Commit to branch: per-tile snapshots (`tests/visual/demo-grid.spec.ts`, 15 tiles + scroll cue + canvas backing-store check)
- [ ] Commit to branch: tolerance map for animated tiles (`tests/visual/demo-links.ts`)
- [x] `.cursor/skills/visual-regression/` skill and `demo-visual-qa` rule
- [ ] Commit to branch: `.github/workflows/ci.yml` (runs on `main` / PR only — add `test/sandbox-playground` until merge)
- [ ] Stabilize flaky `demo-basic` tile (animated raymarcher at page bottom; black canvas vs rendered frame) — helpers added (`scrollIntoViewIfNeeded`, `waitForCanvasPixels`); full green CI run not confirmed

**Depends on:** Stable demo grid after `2.1.0`–`2.1.1`

---

#### Demo sandbox (upstream CodeSandbox layout)

**Goal:** Fullscreen one-shader-per-route demo with **+ More** nav, matching [upstream shadertoy-react CodeSandbox](https://codesandbox.io/s/434qm4x4w0).

**Deliverables**

- [x] [`sandbox/demo-sandbox`](../sandbox/demo-sandbox/) — React Router routes, grouped **+ More** dropdown (Component Props / Built-ins Uniforms)
- [x] One `GlslCanvas` per route: Basic, Textures, Custom Uniforms, iResolution, iMouse, iDate, iFrame, iChannelResolution, iDeviceOrientation
- [x] Fullscreen shell (`index.html` `height: 100%`; menu conditionally rendered for a11y)
- [x] StackBlitz link in README and sandbox README

**Note:** GitHub Pages grid (`examples/`) remains the 15-tile showcase; demo-sandbox is the upstream-style router playground.

**Depends on:** [Examples refactor (TSX + `.frag`)](#examples-refactor-tsx--frag)

---

#### StackBlitz demo-sandbox import fix

**Goal:** `npm run dev` on StackBlitz resolves `glsl-helpers-react` from npm, not a broken `../../lib/` alias.

**Why:** StackBlitz uses only `sandbox/demo-sandbox` as project root; a dev-only Vite alias to `../../lib/glsl-helpers-react.min.js` resolved to `/home/lib/…` and broke imports.

**Deliverables**

- [x] Remove default Vite alias; match `sandbox/playground` (npm resolution)
- [x] Opt-in local lib via `LOCAL_GLSL_LIB=1` after `npm run transpile` at repo root
- [x] Document in [`sandbox/demo-sandbox/README.md`](../sandbox/demo-sandbox/README.md)

**Depends on:** [Demo sandbox](#demo-sandbox-upstream-codesandbox-layout)

---

### Release 2.1.2

**Goal:** Ship `glsl-helpers-react@2.1.2` with render fixes, visual regression CI, and sandbox tier complete.

**Status:** Partial — sandbox tier on `test/sandbox-playground`; library + CI + changelog in **uncommitted working tree**; not merged; not published.

**Version log:** [changelog/2.1.2.md](changelog/2.1.2.md) (local file) · [full index](changelog/README.md)

**Deliverables**

- [ ] Commit working tree: `src/` fixes + `npm run transpile` + `lib/`
- [ ] Commit working tree: Playwright tests + `.github/workflows/ci.yml` + `package.json` 2.1.2
- [x] Demo-sandbox router layout + StackBlitz import fix (on `test/sandbox-playground`)
- [x] `docs/changelog/2.1.2.md` drafted (local)
- [ ] Push `test/sandbox-playground` (2 commits ahead of `origin`)
- [ ] Merge `test/sandbox-playground` → `main`
- [ ] Update StackBlitz README links from `test/sandbox-playground` → `main`
- [ ] `npm run changelog` (regenerate after commits)
- [ ] `npm run publish-demo` (refresh GitHub Pages with 2.1.2 lib)
- [ ] `npm publish` as `glsl-helpers-react@2.1.2`

---

### `2.1.3` — Package hygiene

#### SECURITY.md

**Goal:** Responsible disclosure policy for an embeddable WebGL library.

**Deliverables**

- Contact method, scope (XSS via shader strings, dependency CVEs), expected response time

**Depends on:** None

---

#### Deprecate `shadertoy-react-19` on npm

**Goal:** Single canonical package name.

**Deliverables**

- npm deprecation message pointing to `glsl-helpers-react`
- README migration section already exists; add npm install redirect note

**Depends on:** `glsl-helpers-react@2.0.0` on npm

---

#### ESM `exports` map

**Goal:** Modern package entry points for bundlers and TypeScript.

**Deliverables**

- `package.json` `"exports"` for `.`, `./package.json`, types
- Document CJS vs ESM consumption

**Depends on:** None

---

### `2.1.4` — CI and tests

#### CI on pull requests

**Goal:** Catch broken builds before merge.

**Status:** Partial — `.github/workflows/ci.yml` drafted locally (uncommitted); runs `npm ci`, transpile, build examples, and Playwright visual tests on push/PR to `main`; Dependabot and changelog-dirty check still open. **Note:** workflow and tests are not on `main` until committed; `test/sandbox-playground` is not in the workflow `branches` list until merged.

**Deliverables**

- [ ] Commit `.github/workflows/ci.yml` to branch
- [ ] GitHub Actions: `npm ci`, `npm run transpile`, `npm run build`, `npm run test:visual`
- [ ] Playwright Chromium install in CI (`npx playwright install --with-deps chromium`)
- [ ] Stabilize `demo-basic` visual test flake
- [ ] Optional: fail if `npm run changelog` produces a dirty tree when version bumps change

**Depends on:** [Visual regression for examples](#visual-regression-for-examples)

---

#### Dependabot

**Goal:** Automated dependency update PRs for npm and GitHub Actions.

**Why:** Dev dependencies (Babel, webpack, TypeScript tooling) and future CI workflows drift without a scheduled bump process; manual audits are easy to defer.

**Deliverables**

- `.github/dependabot.yml` for `package.json` / npm ecosystem (weekly or monthly)
- Optional: `github-actions` ecosystem entry once [CI on pull requests](#ci-on-pull-requests) lands
- Grouped updates where sensible (e.g. Babel packages) to limit PR noise
- CONTRIBUTING note: how to review and merge Dependabot PRs (transpile + build before merge)

**Depends on:** None (CI recommended before enabling `github-actions` ecosystem)

---

#### Automated tests

**Goal:** Regression safety for preprocessor and uniform typing.

**Deliverables**

- Unit tests for shader header injection / `mainImage` wrapping (no GPU)
- Optional: headless WebGL smoke test in CI (fragile; may stay manual)

**Depends on:** CI on pull requests

---

### `2.1.5` — Docs and adoption depth

#### Framework cookbooks

**Goal:** Copy-paste setup for popular bundlers.

**Deliverables**

- `docs/recipes/nextjs.md` — raw-loader / Turbopack rules for `.frag` imports (trade app reference)
- `docs/recipes/vite.md` — `?raw` or vite-plugin-glsl
- `docs/recipes/remix.md` — client-only `GlslCanvas` boundary

**Depends on:** [Examples refactor (TSX + `.frag`)](#examples-refactor-tsx--frag) (recommended)

---

#### React Three Fiber bridge doc

**Goal:** Document reusing `.frag` strings outside the 2D canvas component.

**Why:** Trade app uses the same shader sources with `drei/shaderMaterial` via an `r3f-next16` skill.

**Deliverables**

- Short doc: import frag string → `shaderMaterial` / R3F mesh
- Note uniform naming differences vs Shadertoy builtins in custom materials

**Depends on:** Framework cookbooks (optional overlap)

---

#### Bundle size budget

**Goal:** Keep `lib/glsl-helpers-react.min.js` small enough to be a credible “lightweight Shadertoy helper” and enforce that in CI.

**Baseline (2026-06):** ~41 KB minified, ~11 KB gzip. Target after audit: ≤ ~32 KB min / ≤ ~9 KB gzip (stretch: ~30 KB / ~8 KB).

**Deliverables**

- Document baseline + breakdown in README or `docs/performance.md`
- CI guardrail (`size-limit` or `bundlesize`) on `lib/glsl-helpers-react.min.js` — fail PRs over budget without override
- Quick wins without API breaks: dedupe shader preprocess strings, lazy-load optional modules (`persistentTime`, `KeyboardTexture`, multi-pass paths), cache uniform locations
- Optional later: `glsl-helpers-react/core` entry for minimal single-pass use (~6–8 KB gzip)
- README: realistic size note (“~X KB gzip, excl. React”)

**Out of scope:** Example app bundle (~270 KB with React/styled-components).

**Depends on:** CI on pull requests; stable API before splitting entry points

---

#### Custom GLSL-oriented examples

**Goal:** Production-quality shader recipes beyond the demo grid.

**Why:** Real patterns already exist in the trade app (`/home/hso/repos/trade/apps/web`).

**Deliverables**

- `docs/recipes/` or expanded `examples/`:
  - Visibility-gated canvas wrapper (pause when off-screen / tab hidden / `prefers-reduced-motion`)
  - `devicePixelRatio={1}` on heavy fullscreen shaders
  - Sample shaders adapted from production: hero background, data-driven mini-chart
- Cross-link from README and troubleshooting

**Reference paths (trade app)**

- `src/components/shader-canvas.tsx`
- `src/shaders/HeroBg.frag`, `src/shaders/MiniChart.frag`
- `docs/design/shaders.md`

**Depends on:** Examples refactor (recommended)

---

## `2.2.x` (P2) — Framework-agnostic core

**Large release (`2.2.0`).** Extract the WebGL engine from React so other frameworks wrap thin adapters.

### Framework-agnostic core

**Goal:** Shared runtime with no React dependency.

**Deliverables**

- `packages/core` (or similar):
  - Shader preprocessing (GLSL 1.0 ↔ 3.00)
  - `Texture`, `KeyboardTexture`, `FramebufferPool`, `persistentTime`
  - Uniform upload, multi-pass render loop
- Vanilla API: `createGlslCanvas(element, options)`
- React package becomes a thin wrapper over core

**Reference:** `src/index.jsx`, `src/Texture.js`, `src/FramebufferPool.js`

**Depends on:** `2.1.x` stable API and demo surface

---

## `3.0.x` (P3) — Svelte

**Major release (`3.0.0`).** Parity API for Svelte after the shared core exists.

### Svelte version

**Target:** `3.0.0`

**Goal:** `glsl-helpers-svelte` (or `@glsl-helpers/svelte`) with parity API.

**Deliverables**

- Svelte 5-friendly component (runes or classic props)
- Match React surface: uniforms, textures, `passes`, `persistentTime`, `webgl` prop
- Built on [framework-agnostic core](#framework-agnostic-core)

**Depends on:** Framework-agnostic core (`2.2.x`)

---

## `4.0.x` (P4) — WASM / CDN distribution

**Major release (`4.0.0`).** Explore non-npm distribution — **Needs Request for Comments** before implementation.

### WASM / CDN distribution

**Target:** `4.0.0`

**Goal:** Explore non-npm distribution for preprocessor or full runtime.

**Status:** Needs Request for Comments before implementation.

**Possible directions**

- WASM build of GLSL preprocessor for edge/CDN workers
- Documented jsDelivr/unpkg usage for `lib/glsl-helpers-react.min.js` with SRI hashes
- Not committed: full runtime in WASM without WebGL context

**Depends on:** Framework-agnostic core (if preprocessor is split)

---

## `5.0.x` (P5) — Additional framework adapters

**Major release (`5.0.0`).** Thin adapters for frameworks beyond React and Svelte, on top of the shared core.

### Additional framework adapters

**Target:** `5.0.0`

**Goal:** Parity API packages for other UI frameworks (e.g. Vue, Solid, Angular) without duplicating the WebGL engine.

**Deliverables**

- Per-framework package naming (`@glsl-helpers/vue`, etc.) or documented adapter pattern
- Match core surface: uniforms, textures, `passes`, `persistentTime`, `webgl` prop
- Framework cookbooks extended from [2.1.x recipes](#framework-cookbooks)

**Depends on:** Framework-agnostic core (`2.2.x`); [Svelte version](#svelte-version) (`3.0.x`) as reference adapter

---

*Last updated: 2026-06-09 (branch diff review). P0–P2 → `2.x` minors; P3–P5 → majors `3.0.0`, `4.0.0`, `5.0.0`. `2.1.0`–`2.1.1` on `main` + live on `gh-pages`; `2.1.2` sandbox commits on `test/sandbox-playground`; lib/CI/tests uncommitted locally.*
