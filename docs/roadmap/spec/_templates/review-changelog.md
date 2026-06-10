---
id: changelog-{version}
version: {semver}
priority: {prio}
review_type: changelog
changelog_source: ../../changelog/{version}.md
tag: v{version}
---

# Changelog review: {version}

## Release summary

<!-- Bullet inventory from changelog Summary sections -->

## Commit / tag range

```bash
git log v{prev}..v{version} --oneline
```

## Verification matrix

| Changelog claim | Evidence (file / API / test) | Status |
|-----------------|------------------------------|--------|
| | | |

## Bugbot scope

```text
Full Repository Path: /home/hso/repos/glsl-helpers-react
Diff: branch changes
Custom Instructions: Retrospective review of v{version} claims; focus on <!-- areas -->
```

## Security scope

```text
Full Repository Path: /home/hso/repos/glsl-helpers-react
Diff: branch changes
Custom Instructions: <!-- dependency bumps, shader strings, camera/texture -->
```

## Regression signals

- Visual tests (`tests/visual/`) when applicable
- Example tiles and StackBlitz parity

## Gaps

<!-- Changelog claims without code evidence; pending publish notes -->
