# Roadmap specs index

Implementation and review specs for open/partial [roadmap](../roadmap.md) items and per-version [changelog](../../changelog/README.md) verification.

**Naming:** `{priority}.{description}.{version}.md` — lower priority number = higher execution order.

See [EXECUTION.md](./EXECUTION.md) for multitask worktree setup and merge protocol.

**Inventory:** 19 implementation + 19 roadmap review + 15 changelog review = **53 spec files**.

## Roadmap implementation specs

| Prio | File | Version | Status | Paired review |
|------|------|---------|--------|---------------|
| 01 | [delete-stale-remote-branches](implementation/01.delete-stale-remote-branches.2.0.1.md) | 2.0.1 | partial | [review](review/01.delete-stale-remote-branches.2.0.1.md) |
| 02 | [library-render-fixes](implementation/02.library-render-fixes.2.1.2.md) | 2.1.2 | partial | [review](review/02.library-render-fixes.2.1.2.md) |
| 03 | [visual-regression-for-examples](implementation/03.visual-regression-for-examples.2.1.2.md) | 2.1.2 | partial | [review](review/03.visual-regression-for-examples.2.1.2.md) |
| 04 | [release](implementation/04.release.2.1.2.md) | 2.1.2 | partial | [review](review/04.release.2.1.2.md) |
| 05 | [github-pages-demo-deploy](implementation/05.github-pages-demo-deploy.2.1.1.md) | 2.1.1 | partial | [review](review/05.github-pages-demo-deploy.2.1.1.md) |
| 06 | [ci-on-pull-requests](implementation/06.ci-on-pull-requests.2.1.4.md) | 2.1.4 | partial | [review](review/06.ci-on-pull-requests.2.1.4.md) |
| 10 | [securitymd](implementation/10.securitymd.2.1.3.md) | 2.1.3 | planned | [review](review/10.securitymd.2.1.3.md) |
| 11 | [deprecate-shadertoy-react-19](implementation/11.deprecate-shadertoy-react-19.2.1.3.md) | 2.1.3 | planned | [review](review/11.deprecate-shadertoy-react-19.2.1.3.md) |
| 12 | [esm-exports-map](implementation/12.esm-exports-map.2.1.3.md) | 2.1.3 | planned | [review](review/12.esm-exports-map.2.1.3.md) |
| 13 | [dependabot](implementation/13.dependabot.2.1.4.md) | 2.1.4 | planned | [review](review/13.dependabot.2.1.4.md) |
| 14 | [automated-tests](implementation/14.automated-tests.2.1.4.md) | 2.1.4 | planned | [review](review/14.automated-tests.2.1.4.md) |
| 15 | [framework-cookbooks](implementation/15.framework-cookbooks.2.1.5.md) | 2.1.5 | planned | [review](review/15.framework-cookbooks.2.1.5.md) |
| 16 | [react-three-fiber-bridge-doc](implementation/16.react-three-fiber-bridge-doc.2.1.5.md) | 2.1.5 | planned | [review](review/16.react-three-fiber-bridge-doc.2.1.5.md) |
| 17 | [bundle-size-budget](implementation/17.bundle-size-budget.2.1.5.md) | 2.1.5 | planned | [review](review/17.bundle-size-budget.2.1.5.md) |
| 18 | [custom-glsl-oriented-examples](implementation/18.custom-glsl-oriented-examples.2.1.5.md) | 2.1.5 | planned | [review](review/18.custom-glsl-oriented-examples.2.1.5.md) |
| 30 | [framework-agnostic-core](implementation/30.framework-agnostic-core.2.2.0.md) | 2.2.0 | planned | [review](review/30.framework-agnostic-core.2.2.0.md) |
| 40 | [svelte-version](implementation/40.svelte-version.3.0.0.md) | 3.0.0 | planned | [review](review/40.svelte-version.3.0.0.md) |
| 50 | [wasm-cdn-distribution](implementation/50.wasm-cdn-distribution.4.0.0.md) | 4.0.0 | rfc | [review](review/50.wasm-cdn-distribution.4.0.0.md) |
| 60 | [additional-framework-adapters](implementation/60.additional-framework-adapters.5.0.0.md) | 5.0.0 | planned | [review](review/60.additional-framework-adapters.5.0.0.md) |

## Roadmap review specs

Same 19 files as paired column above, under `review/{prio}.{slug}.{version}.md`.

## Changelog review specs

| Prio | File | Version | Tag |
|------|------|---------|-----|
| 01 | [changelog 2.1.2](review/01.changelog.2.1.2.md) | 2.1.2 | pending |
| 02 | [changelog 2.1.1](review/02.changelog.2.1.1.md) | 2.1.1 | v2.1.1 |
| 03 | [changelog 2.1.0](review/03.changelog.2.1.0.md) | 2.1.0 | v2.1.0 |
| 04 | [changelog 2.0.1](review/04.changelog.2.0.1.md) | 2.0.1 | pending |
| 05 | [changelog 2.0.0](review/05.changelog.2.0.0.md) | 2.0.0 | v2.0.0 |
| 06 | [changelog 1.2.0](review/06.changelog.1.2.0.md) | 1.2.0 | v1.2.0 |
| 10 | [changelog 1.1.2](review/10.changelog.1.1.2.md) | 1.1.2 | v1.1.2 |
| 11 | [changelog 1.1.1](review/11.changelog.1.1.1.md) | 1.1.1 | v1.1.1 |
| 12 | [changelog 1.1.0](review/12.changelog.1.1.0.md) | 1.1.0 | v1.1.0 |
| 13 | [changelog 1.0.8](review/13.changelog.1.0.8.md) | 1.0.8 | v1.0.8 |
| 14 | [changelog 1.0.6](review/14.changelog.1.0.6.md) | 1.0.6 | v1.0.6 |
| 15 | [changelog 1.0.5](review/15.changelog.1.0.5.md) | 1.0.5 | v1.0.5 |
| 16 | [changelog 1.0.3](review/16.changelog.1.0.3.md) | 1.0.3 | v1.0.3 |
| 17 | [changelog 1.0.2](review/17.changelog.1.0.2.md) | 1.0.2 | v1.0.2 |
| 18 | [changelog 1.0.0](review/18.changelog.1.0.0.md) | 1.0.0 | v1.0.0 |

## Consolidation status

| Check | Result |
|-------|--------|
| Implementation count | 19 |
| Roadmap review count | 19 |
| Changelog review count | 15 |
| Unique review filenames | 34 |
| Pairing (impl ↔ roadmap review) | All 19 paired |
| Bugbot + Security blocks | Present in all review specs |
