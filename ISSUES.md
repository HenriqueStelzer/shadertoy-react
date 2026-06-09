# Reporting issues

Use this guide before filing a bug or feature request for **glsl-helpers-react** (`GlslCanvas`).

## Which template to use

| Situation | Template |
|-----------|----------|
| Something broke — compile error, wrong uniforms, WebGL failure, demo regression | [Bug report](.github/ISSUE_TEMPLATE/bug_report.md) |
| New prop, API idea, docs improvement, non-urgent enhancement | [Feature request](.github/ISSUE_TEMPLATE/feature_request.md) |

Security vulnerabilities: do **not** open a public issue until [SECURITY.md](docs/roadmap.md#securitymd) exists (planned `2.1.3`). For now, contact the maintainer via GitHub profile email.

## Shader / WebGL bug reports

Include as much of the following as possible. Missing items slow down reproduction.

### Environment

- **OS** (e.g. Arch Linux, macOS 15, Windows 11)
- **Browser + version** (e.g. Firefox 139, Chrome 136)
- **GPU** (if known — `about:support`, `chrome://gpu`, or `renderer` from WebGL debug)
- **`webgl` prop** value: `"auto"`, `"1"`, or `"2"`

### Minimal reproduction

- Smallest `fs` (and `vs` if custom) that fails
- Props passed to `<GlslCanvas />` (`textures`, `passes`, `defines`, etc.)
- Whether the issue appears in `npm start` demos or only in your app

### Logs

- Full browser console output for `glsl-helpers-react:` compile/link errors
- Screenshot or screen recording if visual (black canvas, flipped output, wrong mouse coords)

### Already checked?

- [Troubleshooting](docs/troubleshooting.md) — common WebGL2, Next.js SSR, and uniform issues
- [Migration guide](docs/migration-2.0.md) if upgrading from `shadertoy-react`
- [Uniforms](docs/uniforms.md) / [textures](docs/textures.md) / [multi-pass](docs/multi-pass.md) docs for prop-specific behavior

## Feature requests

Explain the problem, proposed API or behavior, and alternatives considered. Link to roadmap items if related.

## Labels and triage

Issues are triaged against [docs/roadmap.md](docs/roadmap.md). Planned work may be closed with a roadmap link rather than implemented immediately.
