# Spec authoring execution playbook

Orient three parallel agent worktrees to author roadmap implementation specs, roadmap review specs, and changelog review specs under `docs/roadmap/spec/`, then consolidate and compare outputs.

## Prerequisites

- Clean `main` (or `spec/bootstrap` after bootstrap commit)
- Templates in `_templates/` committed
- Subagents in `.cursor/agents/`: `spec-implementation-author`, `spec-review-author`, `spec-consolidator`

## Directory layout

```text
docs/roadmap/spec/
├── EXECUTION.md          # this file
├── README.md             # index (filled by consolidator)
├── _templates/
├── implementation/       # 19 roadmap implementation specs
└── review/               # 19 roadmap + 15 changelog review specs
```

## Naming convention

`{priority}.{description}.{version}.md`

- **priority** — two digits; ascending = higher execution order (01 before 02)
- **description** — kebab-case slug matching roadmap anchor
- **version** — target semver

Changelog review files: `{prio}.changelog.{version}.md` (e.g. `01.changelog.2.1.2.md`).

### Priority gaps (intentional)

| Range | Scope |
|-------|--------|
| 01–06 | Partial / in-flight (2.0.1 hygiene, 2.1.2, Pages, CI) |
| 10–18 | Planned 2.1.3–2.1.5 |
| 30 | P2 framework-agnostic core |
| 40 | P3 Svelte |
| 50 | P4 WASM/CDN (RFC) |
| 60 | P5 additional adapters |

Changelog review: 01–06 fork releases (newest first), 10–18 upstream 1.x.

## Bootstrap (sequential, one agent)

1. Create `_templates/`, this file, `README.md` skeleton
2. Add `.cursor/agents/*` subagents
3. Commit on `spec/bootstrap` and merge to `main` (or branch from it)

## Worktree setup

From repository root (`glsl-helpers-react/`):

```bash
git fetch origin
git checkout main
git pull --ff-only origin main

git branch spec/wt-implementation 2>/dev/null || true
git branch spec/wt-roadmap-review 2>/dev/null || true
git branch spec/wt-changelog-review 2>/dev/null || true

git worktree add ../glsl-helpers-react-spec-impl spec/wt-implementation
git worktree add ../glsl-helpers-react-spec-rreview spec/wt-roadmap-review
git worktree add ../glsl-helpers-react-spec-creview spec/wt-changelog-review
```

Remove worktrees when done:

```bash
git worktree remove ../glsl-helpers-react-spec-impl
git worktree remove ../glsl-helpers-react-spec-rreview
git worktree remove ../glsl-helpers-react-spec-creview
```

## Worktree assignments

| Worktree | Path | Branch | Subagent | Output |
|----------|------|--------|----------|--------|
| **WT1** | `../glsl-helpers-react-spec-impl` | `spec/wt-implementation` | `spec-implementation-author` | `implementation/*.md` (19) |
| **WT2** | `../glsl-helpers-react-spec-rreview` | `spec/wt-roadmap-review` | `spec-review-author` (roadmap) | `review/{prio}.{slug}.{version}.md` (19) |
| **WT3** | `../glsl-helpers-react-spec-creview` | `spec/wt-changelog-review` | `spec-review-author` (changelog) | `review/{prio}.changelog.{version}.md` (15) |

### Parallelism rules

- WT1 only writes `implementation/`
- WT2 and WT3 both write `review/` but **disjoint filenames** (roadmap slugs vs `changelog` segment)
- Do not edit `EXECUTION.md` or `README.md` in parallel worktrees except consolidator

### WT1 agent prompt

```text
Use subagent spec-implementation-author.
Read docs/roadmap/spec/EXECUTION.md and docs/roadmap.md.
Author all 19 files in docs/roadmap/spec/implementation/ using _templates/implementation.md.
Follow priority map in EXECUTION.md. Cross-link paired review paths in Handoff.
Do not invent deliverables beyond roadmap.md.
```

### WT2 agent prompt

```text
Use subagent spec-review-author (roadmap mode).
Read docs/roadmap/spec/EXECUTION.md and paired implementation specs (or roadmap sections).
Author 19 roadmap review specs in docs/roadmap/spec/review/ (not changelog.* files).
Include Bugbot and Security invocation blocks per /review-bugbot and /review-security skills.
```

### WT3 agent prompt

```text
Use subagent spec-review-author (changelog mode).
Read docs/changelog/*.md and _templates/review-changelog.md.
Author 15 files: review/{prio}.changelog.{version}.md for versions in changelog/README.md.
Newest fork releases first (01=2.1.2 … 06=1.2.0, then 10+=upstream 1.x).
```

## Compare outputs

After all three worktrees commit:

```bash
# Disjoint paths (expect no overlap conflicts except README if edited)
git diff spec/wt-implementation spec/wt-roadmap-review -- docs/roadmap/spec/
git diff spec/wt-implementation spec/wt-changelog-review -- docs/roadmap/spec/implementation/
git diff spec/wt-roadmap-review spec/wt-changelog-review -- docs/roadmap/spec/review/
```

### Comparison rubric

| Check | Pass condition |
|-------|----------------|
| Naming | All files match `{prio}.{desc}.{version}.md` or `{prio}.changelog.{version}.md` |
| Pairing | 19 implementation ↔ 19 roadmap review specs linked in frontmatter |
| Priority gaps | Documented above; no accidental duplicate prio numbers |
| Partial accuracy | Specs 02–06 cite uncommitted work from roadmap L252–254 |
| Changelog coverage | 15 versions each have `review/{prio}.changelog.{version}.md` |
| Review prompts | Every review spec has Bugbot + Security blocks |
| No dup filenames | All 34 `review/` filenames unique |

Run `spec-consolidator` subagent for drift report.

## Merge order

1. `spec/wt-implementation` → `spec/consolidated`
2. `spec/wt-roadmap-review` → `spec/consolidated`
3. `spec/wt-changelog-review` → `spec/consolidated`
4. `spec-consolidator` updates `README.md` index
5. PR `spec/consolidated` → `main`

Resolve conflicts only in `README.md` / `EXECUTION.md` if multiple agents edited them.

## Running reviews later

Use `/review` skill: user picks **bugbot** or **security**. Agent loads the matching `spec/review/*.md` and passes `Custom Instructions` from that file into the subagent prompt.

## File inventory

### Implementation + roadmap review (19 pairs)

| Prio | Slug | Version |
|------|------|---------|
| 01 | delete-stale-remote-branches | 2.0.1 |
| 02 | library-render-fixes | 2.1.2 |
| 03 | visual-regression-for-examples | 2.1.2 |
| 04 | release | 2.1.2 |
| 05 | github-pages-demo-deploy | 2.1.1 |
| 06 | ci-on-pull-requests | 2.1.4 |
| 10 | securitymd | 2.1.3 |
| 11 | deprecate-shadertoy-react-19 | 2.1.3 |
| 12 | esm-exports-map | 2.1.3 |
| 13 | dependabot | 2.1.4 |
| 14 | automated-tests | 2.1.4 |
| 15 | framework-cookbooks | 2.1.5 |
| 16 | react-three-fiber-bridge-doc | 2.1.5 |
| 17 | bundle-size-budget | 2.1.5 |
| 18 | custom-glsl-oriented-examples | 2.1.5 |
| 30 | framework-agnostic-core | 2.2.0 |
| 40 | svelte-version | 3.0.0 |
| 50 | wasm-cdn-distribution | 4.0.0 |
| 60 | additional-framework-adapters | 5.0.0 |

### Changelog review (15)

| Prio | Version |
|------|---------|
| 01 | 2.1.2 |
| 02 | 2.1.1 |
| 03 | 2.1.0 |
| 04 | 2.0.1 |
| 05 | 2.0.0 |
| 06 | 1.2.0 |
| 10 | 1.1.2 |
| 11 | 1.1.1 |
| 12 | 1.1.0 |
| 13 | 1.0.8 |
| 14 | 1.0.6 |
| 15 | 1.0.5 |
| 16 | 1.0.3 |
| 17 | 1.0.2 |
| 18 | 1.0.0 |
