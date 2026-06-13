---
id: {slug}
version: {semver}
priority: {prio}
review_type: roadmap
paired_implementation: ../implementation/{prio}.{slug}.{version}.md
---

# Review: {Title}

## Review scope

<!-- Files and directories to inspect -->

## Diff strategy

- **Default:** `branch changes` against `main`
- **Use `uncommitted changes` when:** local working-tree work is not yet committed (partial 2.1.2 items)

## Bugbot invocation

```text
Full Repository Path: /home/hso/repos/glsl-helpers-react
Diff: branch changes
Custom Instructions: <!-- item-specific focus -->
```

## Security review invocation

```text
Full Repository Path: /home/hso/repos/glsl-helpers-react
Diff: branch changes
Custom Instructions: <!-- WebGL/XSS/dependency scope where relevant -->
```

## Manual checks

- [ ] Docs and demo URLs
- [ ] npm / gh-pages steps not caught by diff review

## Pass criteria

| Acceptance criterion | Verification |
|---------------------|--------------|
| | |

## Severity routing

- **Critical** — block merge
- **Warning** — follow-up issue
- **Suggestion** — optional improvement
