# Migration to glsl-helpers-react 2.0

## Package rename

| Before | After |
|--------|-------|
| npm: `shadertoy-react` or `shadertoy-react-19` | npm: `glsl-helpers-react` |
| `lib/shadertoy-react.min.js` | `lib/glsl-helpers-react.min.js` |
| Default export: `ShadertoyReact` | Default export: `GlslCanvas` |

```bash
npm uninstall shadertoy-react shadertoy-react-19
npm install glsl-helpers-react
```

## Import changes

```javascript
// Before
import ShadertoyReact from "shadertoy-react";

// After
import GlslCanvas from "glsl-helpers-react";
```

Legacy alias (deprecated, dev warning in non-production):

```javascript
import { ShadertoyReact } from "glsl-helpers-react";
```

## Breaking changes

1. **Default export** — `GlslCanvas`, not `ShadertoyReact`.
2. **Bundle filename** — update any direct `lib/` path references.
3. **Peer dependencies** — React `^17 || ^18 || ^19` and matching `react-dom`.
4. **Log prefix** — console messages use `glsl-helpers-react:` instead of `shadertoy-react:`.

## Non-breaking for most shaders

Shadertoy-style `mainImage`, built-in uniforms (`iTime`, `iMouse`, `iChannel0`, …), and texture props remain compatible. Shaders do not need changes unless you adopt new 2.x features.

## New optional features (2.x)

- `webgl="auto" | "1" | "2"`
- `defines={{ KEY: value }}`
- `passes` for multi-pass pipelines
- Extended textures: `camera`, `data`, `cube`, `keyboard`, `srcSet`
- `persistentTime` for `iPersistentTime`
- TypeScript types via `lib/index.d.ts`

## Further reading

- [Textures](./textures.md)
- [Multi-pass](./multi-pass.md)
- [Uniforms](./uniforms.md)
- [Changelog](./changelog/README.md)
