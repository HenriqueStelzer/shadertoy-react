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
| P0 | [Fork delta from shadertoy-react 1.x](#p0-fork-delta-from-shadertoy-react-1x-react-17-baseline--done) | Done |
| P0 | [CONTRIBUTING.md](#p0-contributingmd) | Planned |
| P0 | [ISSUES.md](#p0-issuesmd) | Planned |
| P0 | [License naming clarification](#p0-license-naming-clarification) | Planned |
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

### P0: Fork delta from shadertoy-react 1.x (React 17 baseline) — Done

**Baseline:** [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react) **v1.1.2** — last upstream release before this fork. `ShadertoyReact`, React **16** peer, **WebGL 1 only**, image/video textures, `shouldComponentUpdate` always `false` (no live prop updates).

**Shipped as:** `glsl-helpers-react` **v2.0.0** on `main` ([`v2.0.0`](https://github.com/HenriqueStelzer/glsl-helpers-react/releases/tag/v2.0.0), commit [`ebd5404`](https://github.com/HenriqueStelzer/glsl-helpers-react/commit/ebd5404)).

| Area | shadertoy-react 1.1.2 | glsl-helpers-react 2.0.0 |
|------|------------------------|---------------------------|
| npm package | `shadertoy-react` | `glsl-helpers-react` |
| Component export | `ShadertoyReact` (default) | `GlslCanvas` (default); `ShadertoyReact` deprecated alias |
| Bundle | `lib/shadertoy-react.min.js` | `lib/glsl-helpers-react.min.js` |
| React peers | `^16` | `^17 \|\| ^18 \|\| ^19` |
| WebGL | WebGL 1 only | WebGL 1 / 2 via `webgl="auto" \| "1" \| "2"`; GLSL 3.00 auto-preprocess |
| Prop updates | None without remount | Reactive `fs`, `vs`, `textures`, `defines`, `passes`, `uniforms`, `precision`, … |
| Shader defines | `#define DPR` only | `defines` prop + `DPR` |
| Textures | Image, video | + camera, `rgba8` / `rgba32f` data, cube maps, keyboard, responsive `srcSet` |
| Channel time | — | `iChannelTime` (video / camera sync) |
| Multi-pass | — | `passes` + `FramebufferPool` (buffer pipelines) |
| Persistent clock | — | `persistentTime` prop → `iPersistentTime` (localStorage) |
| TypeScript | — | `lib/index.d.ts` |
| Build toolchain | Webpack 4, Babel 7.16 | Webpack 5, Babel 7.26, webpack-dev-server 5 |
| Docs | README + examples | Migration guide, textures, multi-pass, uniforms, troubleshooting, versioned changelog |
| Examples | Classic demo grid | + camera, cube, data texture, multi-pass, persistent time, srcSet tiles |
| Post-release fixes | — | WebGL2 sized `internalFormat` for FBO/data/keyboard; multi-pass `iChannel` offset; empty `srcSet` fallback |

**Migration:** [migration-2.0.md](migration-2.0.md) · **Changelog:** [changelog/2.0.0.md](changelog/2.0.0.md) · **API overview:** README “What's new in 2.x”

---

### P0: CONTRIBUTING.md

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

### P0: ISSUES.md

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

### P0: License naming clarification

**Goal:** One canonical MIT license file and clear attribution docs.

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

**Status:** Merged to `main`, tagged `v2.0.0`. Remaining: `npm publish` (requires npm auth).

**Deliverables**

- [x] Merge 2.0 release branch into `main`
- [x] Copilot review fixes (reactive props, WebGL2 formats, multi-pass channels)
- [x] Tag `v2.0.0`
- [ ] `npm publish` after `npm run prepublishOnly`

**Depends on:** Changelog docs accurate for 1.2.0 / 2.0.0 split

---

### P0: Delete stale remote branches

**Goal:** Clean GitHub branch list after merge.

**Status:** `release/2.0.0` and ephemeral agent branches removed. `modernize-react-webgl2` may still exist on remote.

**Branches safe to delete (no unique code):**

- `modernize-react-webgl2` — merged via PR #1

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

**Milestone:** 2.0.1 or 2.1.0

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

*Last updated: 2026-06-09. Regenerate or extend this file when priorities shift.*
