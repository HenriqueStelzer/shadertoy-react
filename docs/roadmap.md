# Roadmap

Public backlog for **glsl-helpers-react**, ranked by priority. Items are aspirational until checked off in a release or PR.

**How to read priorities**

| Priority | Meaning |
|----------|---------|
| **P0** | Blockers for trust, legal clarity, or shipping |
| **P1** | High impact on adoption and developer experience |
| **P2** | New runtimes or architectural splits |
| **P3** | Research tracks and experiments |

---

## Summary

| Priority | Item | Status |
|----------|------|--------|
| P0 | [Package rebrand (`glsl-helpers-react`)](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [`GlslCanvas` + deprecated `ShadertoyReact` alias](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [React 17–19 peer support](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [WebGL2 / GLSL 3.00 (`webgl` prop)](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [Reactive prop updates](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [`defines` prop](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [Extended textures (camera, data, cube, keyboard, `srcSet`)](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [`iChannelTime` uniform](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [Multi-pass rendering (`passes`)](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [`persistentTime` / `iPersistentTime`](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [TypeScript definitions](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [Webpack 5 / modern build toolchain](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [2.0 docs (migration, textures, multi-pass, changelog)](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [2.0 example demos](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [WebGL2 `internalFormat` + multi-pass channel fixes](#completed--fork-from-shadertoy-react-1112) | Done |
| P0 | [Release 2.0.1 hygiene](#p0-release-201) | Planned |
| P0 | [Release 2.0.0](#p0-release-20) | Done (npm publish pending) |
| P0 | [Delete stale remote branches](#p0-delete-stale-remote-branches) | Partial |
| P1 | [CodeSandbox / StackBlitz templates](#p1-codesandbox--stackblitz-templates) | Planned |
| P1 | [Custom GLSL examples](#p1-custom-glsl-oriented-examples) | Planned |
| P1 | [CI on pull requests](#p1-ci-on-pull-requests) | Planned |
| P1 | [Bundle size budget](#p1-bundle-size-budget) | Planned |
| P1 | [GitHub Pages demo deploy](#p1-github-pages-demo-deploy) | Planned |
| P1 | [Framework cookbooks](#p1-framework-cookbooks) | Planned |
| P1 | [React Three Fiber bridge doc](#p1-react-three-fiber-bridge-doc) | Planned |
| P2 | [Svelte version](#p2-svelte-version) | Planned |
| P2 | [Framework-agnostic core](#p2-framework-agnostic-core) | Planned |
| P2 | [Automated tests](#p2-automated-tests) | Planned |
| P2 | [ESM `exports` map](#p2-esm-exports-map) | Planned |
| P2 | [Deprecate `shadertoy-react-19` on npm](#p2-deprecate-shadertoy-react-19-on-npm) | Planned |
| P3 | [WASM / CDN distribution](#p3-wasm--cdn-distribution) | Needs RFC |
| P3 | [Visual regression for examples](#p3-visual-regression-for-examples) | Planned |
| P3 | [SECURITY.md](#p3-securitymd) | Planned |

---

## P0 — Community, legal, and repo hygiene

### Completed — fork from shadertoy-react 1.1.2

**Baseline:** [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react) **v1.1.2** — `ShadertoyReact`, React **16**, WebGL **1** only, image/video textures, no live prop updates.

**Shipped:** `glsl-helpers-react` **v2.0.0** on `main` ([`v2.0.0`](https://github.com/HenriqueStelzer/glsl-helpers-react/releases/tag/v2.0.0)).

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

### P0: Release 2.0.1

**Goal:** Repo hygiene and contributor onboarding for the post-2.0.0 line.

**Target npm version:** `2.0.1` (patch — docs and repo files only; no API changes).

| Item | Section |
|------|---------|
| [CONTRIBUTING.md](#p0-contributingmd) | Contributor workflow |
| [ISSUES.md](#p0-issuesmd) | Bug-report expectations |
| [License naming clarification](#p0-license-naming-clarification) | Single canonical `LICENSE` |

**Depends on:** `glsl-helpers-react@2.0.0` published to npm

---

### P0: CONTRIBUTING.md

**Goal:** Onboard contributors with fork-specific workflow.

**Milestone:** 2.0.1

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

### P0: ISSUES.md

**Goal:** Tell reporters what we need to reproduce WebGL issues quickly.

**Milestone:** 2.0.1

**Why:** GitHub only has generic [bug](../.github/ISSUE_TEMPLATE/bug_report.md) and [feature](../.github/ISSUE_TEMPLATE/feature_request.md) templates with no fork branding.

**Deliverables**

- Top-level `ISSUES.md` (GitHub discoverability) linked from README
- When to use bug vs feature template
- Required info for shader bugs: browser, OS, GPU (if known), `webgl` prop value, minimal `fs` repro, full console compile/link log
- Link to [troubleshooting](troubleshooting.md)
- Sub-task: refresh `.github/ISSUE_TEMPLATE/*.md` to mention `glsl-helpers-react` / `GlslCanvas`

**Depends on:** None

---

### P0: License naming clarification

**Goal:** One canonical MIT license file and clear attribution docs.

**Milestone:** 2.0.1

**Why:** Repo has both `LICENSE` (dual copyright, fork) and `LICENCE.txt` (upstream-only, British spelling). README points only to `LICENSE`.

**Deliverables**

- Canonical file: `LICENSE` (keep dual copyright line)
- Remove `LICENCE.txt` or replace with a one-line pointer to `LICENSE`
- Document in README + CONTRIBUTING: MIT for the package; upstream © Morgan Villedieu preserved
- Call out **shader content** licenses separately (e.g. `examples/src/shaders/mouse.js` is CC BY-NC-SA) — not the npm package license

**Depends on:** CONTRIBUTING.md (cross-link)

---

### P0: Release 2.0.0

**Goal:** Ship `glsl-helpers-react@2.0.0` to npm.

**Status:** On `main`; tag [`v2.0.0`](https://github.com/HenriqueStelzer/glsl-helpers-react/releases/tag/v2.0.0) targets `96b5cbf` (code + docs). Remaining: `npm publish` (requires npm auth).

**Deliverables**

- [x] Merge 2.0 release branch into `main`
- [x] Copilot review fixes (reactive props, WebGL2 formats, multi-pass channels)
- [x] Roadmap and changelog docs on `main`
- [ ] Move `v2.0.0` tag to `96b5cbf` if still at `ebd5404`
- [ ] `npm publish` from tag: `git checkout v2.0.0 && npm run publish-npm`

**Depends on:** [Changelog](changelog/README.md) lists all 2.0.0 commits (code + docs)

---

### P0: Delete stale remote branches

**Goal:** Clean GitHub branch list after merge.

**Status:** `release/2.0.0` removed. `modernize-react-webgl2` and merged doc branches may still exist on remote.

**Branches safe to delete (no unique code):**

- `modernize-react-webgl2` — merged via PR #1
- `chore/changelog-2.0.1-alignment`, `release/2.0.1` — after doc PRs merge

**Depends on:** None

---

## P1 — Discoverability and developer experience

### P1: CodeSandbox / StackBlitz templates

**Goal:** Restored “Playground” section like upstream had.

**Why:** Upstream README linked to live sandboxes ([Basic](https://codesandbox.io/s/ojllzxvww6), [Demos](https://codesandbox.io/s/434qm4x4w0)); fork README has none.

**Deliverables**

- Port templates to `glsl-helpers-react` + `GlslCanvas`
- Minimum set: basic fullscreen shader, textures, multi-pass
- Next.js + raw `.frag` import (see framework cookbooks)
- README “Playground” section with links
- Consider StackBlitz as alternative where CodeSandbox limits apply

**Depends on:** Release 2.0.0 on npm

---

### P1: Custom GLSL-oriented examples

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

**Depends on:** Release 2.0.0

---

### P1: CI on pull requests

**Goal:** Catch broken builds before merge.

**Why:** No `.github/workflows/` today; `npm test` is a stub.

**Deliverables**

- GitHub Actions: `npm ci`, `npm run transpile`, `npm run build`
- Optional: fail if `npm run changelog` produces a dirty tree when version bumps change

**Depends on:** None

---

### P1: Bundle size budget

**Goal:** Keep `lib/glsl-helpers-react.min.js` small enough to be a credible “lightweight Shadertoy helper” and enforce that in CI.

**Baseline (2026-06):** ~41 KB minified, ~11 KB gzip. Target after audit: ≤ ~32 KB min / ≤ ~9 KB gzip (stretch: ~30 KB / ~8 KB).

**Deliverables**

- Document baseline + breakdown in README or `docs/performance.md`
- CI guardrail (`size-limit` or `bundlesize`) on `lib/glsl-helpers-react.min.js` — fail PRs over budget without override
- Quick wins without API breaks: dedupe shader preprocess strings, lazy-load optional modules (`persistentTime`, `KeyboardTexture`, multi-pass paths), cache uniform locations
- Optional later: `glsl-helpers-react/core` entry for minimal single-pass use (~6–8 KB gzip)
- README: realistic size note (“~X KB gzip, excl. React”)

**Out of scope:** Example app bundle (~270 KB with React/styled-components).

**Depends on:** Release 2.0.0 stable API (before splitting entry points)

**Milestone:** 2.1.0

---

### P1: GitHub Pages demo deploy

**Goal:** Live demo at `homepage` URL.

**Why:** `package.json` `homepage` points at the fork; verify `npm run publish-demo` after 2.0 rebrand.

**Deliverables**

- Confirm `gh-pages` branch serves updated `examples/dist`
- Document deploy steps in CONTRIBUTING.md

**Depends on:** Release 2.0.0

---

### P1: Framework cookbooks

**Goal:** Copy-paste setup for popular bundlers.

**Deliverables**

- `docs/recipes/nextjs.md` — raw-loader / Turbopack rules for `.frag` imports (trade app reference)
- `docs/recipes/vite.md` — `?raw` or vite-plugin-glsl
- `docs/recipes/remix.md` — client-only `GlslCanvas` boundary

**Depends on:** Release 2.0.0

---

### P1: React Three Fiber bridge doc

**Goal:** Document reusing `.frag` strings outside the 2D canvas component.

**Why:** Trade app uses the same shader sources with `drei/shaderMaterial` via an `r3f-next16` skill.

**Deliverables**

- Short doc: import frag string → `shaderMaterial` / R3F mesh
- Note uniform naming differences vs Shadertoy builtins in custom materials

**Depends on:** Framework cookbooks (optional overlap)

---

## P2 — New runtimes and architecture

### P2: Svelte version

**Goal:** `glsl-helpers-svelte` (or `@glsl-helpers/svelte`) with parity API.

**Deliverables**

- Svelte 5-friendly component (runes or classic props)
- Match React surface: uniforms, textures, `passes`, `persistentTime`, `webgl` prop
- Shared core (see framework-agnostic item)

**Depends on:** Framework-agnostic core (recommended)

---

### P2: Framework-agnostic core

**Goal:** Extract WebGL engine from React so other frameworks wrap thin adapters.

**Deliverables**

- `packages/core` (or similar) with no React dependency:
  - Shader preprocessing (GLSL 1.0 ↔ 3.00)
  - `Texture`, `KeyboardTexture`, `FramebufferPool`, `persistentTime`
  - Uniform upload, multi-pass render loop
- Vanilla API: `createGlslCanvas(element, options)`
- React package becomes a thin wrapper over core

**Reference:** `src/index.jsx`, `src/Texture.js`, `src/FramebufferPool.js`

**Depends on:** Release 2.0.0 stable API

---

### P2: Automated tests

**Goal:** Regression safety for preprocessor and uniform typing.

**Deliverables**

- Unit tests for shader header injection / `mainImage` wrapping (no GPU)
- Optional: headless WebGL smoke test in CI (fragile; may stay manual)

**Depends on:** CI on pull requests

---

### P2: ESM `exports` map

**Goal:** Modern package entry points for bundlers and TypeScript.

**Deliverables**

- `package.json` `"exports"` for `.`, `./package.json`, types
- Document CJS vs ESM consumption

**Depends on:** Release 2.0.0

---

### P2: Deprecate `shadertoy-react-19` on npm

**Goal:** Single canonical package name.

**Deliverables**

- npm deprecation message pointing to `glsl-helpers-react`
- README migration section already exists; add npm install redirect note

**Depends on:** Release 2.0.0 published

---

## P3 — Research and experiments

### P3: WASM / CDN distribution

**Goal:** Explore non-npm distribution for preprocessor or full runtime.

**Status:** Needs RFC before implementation.

**Possible directions**

- WASM build of GLSL preprocessor for edge/CDN workers
- Documented jsDelivr/unpkg usage for `lib/glsl-helpers-react.min.js` with SRI hashes
- Not committed: full runtime in WASM without WebGL context

**Depends on:** Framework-agnostic core (if preprocessor is split)

---

### P3: Visual regression for examples

**Goal:** Catch GPU/render regressions in the demo grid.

**Deliverables**

- Playwright screenshots per example tile
- Tolerance for cross-GPU variance or skip in CI

**Depends on:** CI on pull requests

---

### P3: SECURITY.md

**Goal:** Responsible disclosure policy for an embeddable WebGL library.

**Deliverables**

- Contact method, scope (XSS via shader strings, dependency CVEs), expected response time

**Depends on:** None

---

*Last updated: 2026-06-09. Docs and changelog count toward 2.0.0; repo hygiene targets 2.0.1.*
