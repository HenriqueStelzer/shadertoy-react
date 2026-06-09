# glsl-helpers-react

[![npm version](https://badge.fury.io/js/glsl-helpers-react.svg)](https://www.npmjs.com/package/glsl-helpers-react)
[![gzip size](https://img.badgesize.io/HenriqueStelzer/glsl-helpers-react/main/lib/glsl-helpers-react.min.js?label=gzip&compression=gzip)](https://github.com/HenriqueStelzer/glsl-helpers-react/blob/main/lib/glsl-helpers-react.min.js)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/MIT)

[![roadmap](https://img.shields.io/badge/docs-roadmap-0969da)](docs/roadmap.md)
[![changelog](https://img.shields.io/badge/docs-changelog-0969da)](docs/changelog/README.md)
[![migration 2.0](https://img.shields.io/badge/docs-migration%202.0-0969da)](docs/migration-2.0.md)
[![textures](https://img.shields.io/badge/docs-textures-0969da)](docs/textures.md)
[![multi-pass](https://img.shields.io/badge/docs-multi--pass-0969da)](docs/multi-pass.md)
[![uniforms](https://img.shields.io/badge/docs-uniforms-0969da)](docs/uniforms.md)
[![troubleshooting](https://img.shields.io/badge/docs-troubleshooting-0969da)](docs/troubleshooting.md)
[![contributing](https://img.shields.io/badge/docs-contributing-0969da)](CONTRIBUTING.md)
[![issues](https://img.shields.io/badge/docs-issues-0969da)](ISSUES.md)

**React GLSL canvas with Shadertoy-compatible uniforms and extended helpers.**

> **Fork notice:** This project is a maintained fork of [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react). The prior npm package for this fork was [`shadertoy-react-19`](https://www.npmjs.com/package/shadertoy-react-19). Version 2.x ships as **`glsl-helpers-react`** with a new primary API (`GlslCanvas`) while keeping a deprecated `ShadertoyReact` alias.

## What's new in 2.x

- **`GlslCanvas`** — new primary component export
- **WebGL2 / GLSL 3.00** — auto-detect or force via `webgl="auto" | "1" | "2"`
- **React 19** support
- **TypeScript definitions** — props IntelliSense via `index.d.ts`
- **Reactive props** — `textures`, `fs`, `defines`, and shader schema updates without remounting
- **`defines` prop** — inject `#define` constants from React
- **`srcSet` textures** — responsive image density like `<img srcSet />`
- **`iChannelTime`** — per-channel playback time (videos sync to `currentTime`)
- **Extended textures** — camera, data, cube maps, keyboard input
- **Multi-pass rendering** — Shadertoy-style buffer passes via `passes` prop
- **`persistentTime`** — opt-in `iPersistentTime` uniform that survives page refresh

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Reporting issues](ISSUES.md)
- [Roadmap](docs/roadmap.md)
- [Changelog](docs/changelog/README.md)
- [Migration guide (2.0)](docs/migration-2.0.md)
- [Textures](docs/textures.md)
- [Multi-pass rendering](docs/multi-pass.md)
- [Uniforms](docs/uniforms.md)
- [Troubleshooting](docs/troubleshooting.md)

## Install

```bash
npm install glsl-helpers-react
```

## Quick start

```javascript
import React from "react";
import GlslCanvas from "glsl-helpers-react";

const fs = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  fragColor = vec4(0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0.0, 2.0, 4.0)), 1.0);
}
`;

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GlslCanvas fs={fs} />
    </div>
  );
}
```

## Playground

Try `glsl-helpers-react` in the browser without cloning the repo:

* [Basic](https://codesandbox.io/p/github/HenriqueStelzer/glsl-helpers-react/tree/main/sandbox/basic) — minimal fullscreen `GlslCanvas` + one `.frag` shader
* [Demos](https://codesandbox.io/p/github/HenriqueStelzer/glsl-helpers-react/tree/main/sandbox/demos) — mouse, image texture, and multi-pass

Source for both sandboxes lives under [`sandbox/`](sandbox/).

## Migration from shadertoy-react

| Before | After |
|---|---|
| `import X from 'shadertoy-react'` | `import GlslCanvas from 'glsl-helpers-react'` |
| `<ShadertoyReact fs={fs} />` | `<GlslCanvas fs={fs} />` |
| npm: `shadertoy-react-19` | npm: `glsl-helpers-react` |

Legacy import (deprecated):

```javascript
import { ShadertoyReact } from "glsl-helpers-react";
```

## Props

| Prop | Type | Description |
|---|---|---|
| `fs` | `string` | Fragment shader (Shadertoy or classic GLSL syntax) |
| `vs` | `string` | Optional vertex shader |
| `passes` | `PassProps[]` | Multi-pass pipeline (see below) |
| `textures` | `TextureProps[]` | Input channels (`iChannel0`, …) |
| `uniforms` | `object` | Custom uniforms |
| `defines` | `object` | `#define` constants injected into the shader |
| `clearColor` | `[r,g,b,a]` | WebGL clear color (default `[0,0,0,1]`) |
| `precision` | `lowp \| mediump \| highp` | GLSL float precision |
| `devicePixelRatio` | `number` | Canvas pixel density (default `1`) |
| `webgl` | `auto \| 1 \| 2` | WebGL version selection |
| `lerp` | `0–1` | Mouse position smoothing |
| `style` | `CSSProperties` | Canvas inline style |
| `contextAttributes` | `WebGLContextAttributes` | Passed to `getContext` |
| `onDoneLoadingTextures` | `function` | Called when all textures are loaded |
| `persistentTime` | `boolean \| object` | Opt-in epoch time via `iPersistentTime` (survives refresh) |

### Built-in uniforms

Shadertoy-compatible uniforms are injected automatically when referenced in your shader:

- `iTime`, `iTimeDelta`, `iFrame`, `iResolution`, `iDate`, `iMouse`
- `iChannel0`…`iChannelN`, `iChannelResolution`, **`iChannelTime`**
- `iDeviceOrientation` (extension)
- `iPersistentTime` (extension; requires `persistentTime` prop)
- `#define DPR` from `devicePixelRatio`

Unused uniforms skip event listeners and GPU uploads.

### Persistent time (`persistentTime`)

```javascript
// Continues across page refresh (localStorage)
<GlslCanvas fs={fs} persistentTime />

// Custom epoch and shared storage key
<GlslCanvas
  fs={fs}
  persistentTime={{
    epoch: "2026-01-01T00:00:00Z",
    storageKey: "my-app:shader-clock",
    shared: true,
  }}
/>
```

Use `iPersistentTime` in the shader for wall-clock phase; `iTime` remains session time since mount. See [Uniforms](docs/uniforms.md).

### Custom uniforms

```javascript
<GlslCanvas
  fs={fs}
  uniforms={{
    uScroll: { type: "1f", value: scrollY },
    uMatrix: { type: "Matrix2fv", value: [0, 1, 2, 3] },
  }}
/>
```

Supported types: `1f`, `2f`, `3f`, `4f`, `1fv`–`4fv`, `1i`–`4i`, `1iv`–`4iv`, `Matrix2fv`, `Matrix3fv`, `Matrix4fv`.

### `#define` from props

```javascript
<GlslCanvas fs={fs} defines={{ PI: "3.14159", FEATURE_FLAG: 1 }} />
```

### Textures

```javascript
// Image or video URL
{ url: "./texture.png" }

// Responsive srcSet (1x, 2x, 3x)
{ url: "./a.png", srcSet: { 1: "./a.png", 2: "./a@2x.png", 3: "./a@3x.png" } }
// or: srcSet: "a.png 1x, a@2x.png 2x"

// Camera feed (requires HTTPS and user permission)
{ type: "camera", facingMode: "user", width: 640, height: 480 }

// Raw data texture (rgba32f requires WebGL2 or OES_texture_float)
{ type: "data", width: 256, height: 256, data: uint8Array, format: "rgba8" }

// Cube map (6 face URLs: +X, -X, +Y, -Y, +Z, -Z)
{ type: "cube", urls: [px, nx, py, ny, pz, nz] }

// Keyboard input (Shadertoy-style 256×3 data texture)
{ type: "keyboard" }
```

Import filter/wrap constants:

```javascript
import GlslCanvas, { LinearFilter, RepeatWrapping } from "glsl-helpers-react";
```

### Multi-pass rendering

```javascript
<GlslCanvas
  passes={[
    { fs: bufferShaderA, target: "bufferA" },
    { fs: bufferShaderB, inputs: ["bufferA"], target: "bufferB" },
    { fs: finalShader, inputs: ["bufferA", "bufferB"] },
  ]}
/>
```

Each pass renders to an internal framebuffer (`target`) or to the screen (last pass). Buffer outputs are wired to `iChannel0`, `iChannel1`, … in subsequent passes via `inputs`.

**Limitations:** One framebuffer per `target` name (no automatic ping-pong). Self-feedback shaders read the previous frame's buffer. See [Multi-pass](docs/multi-pass.md).

### WebGL2 / GLSL 3.00

Set `webgl="2"` or `webgl="auto"` (default). Shadertoy syntax is rewritten automatically (`gl_FragColor` → `fragColor`, `texture2D` → `texture`). You can also author shaders with `#version 300 es` directly.

## Playground

Live CodeSandbox templates (like [upstream shadertoy-react](https://github.com/mvilledieu/shadertoy-react#playground)) are planned — see [roadmap](docs/roadmap.md#codesandbox-playground-like-upstream). Until then, run the local demo grid below.

## Examples

Run `npm start` and open the demo grid (**scroll down** — tiles extend below the first viewport). Includes: basic shader, mouse, clock, device orientation, custom uniforms, WebGL2 syntax, keyboard, multi-pass, persistent time, camera, data texture, cube map, and `srcSet` density.

## How it works

A full-viewport quad is rendered with WebGL. Canvas size follows the parent element (100% × 100% by default, overridable via `style`). Uniforms and textures referenced in the shader source are detected at compile time — unused inputs do not register listeners or GPU state.

## Roadmap status

| Feature | Status |
|---|---|
| Module / props IntelliSense | Done (2.x) |
| Dynamic texture reload on prop change | Done (2.x) |
| Responsive `srcSet` textures | Done (2.x) |
| `#define` from props | Done (2.x) |
| Camera feed texture | Done (2.x) |
| Data texture | Done (2.x) |
| WebGL2 / GLSL 3.00 | Done (2.x) |
| Keyboard input texture | Done (2.x) |
| `iChannelTime` | Done (2.x) |
| Cube texture | Done (2.x) |
| Multi-pass rendering | Done (2.x) |
| Persistent time (`iPersistentTime`) | Done (2.x) |

## License

MIT — see [LICENSE](LICENSE). Original work © Morgan Villedieu; fork maintenance © Henrique Stelzer de Oliveira.

**Shader examples** in `examples/src/shaders/` may carry separate licenses (e.g. CC BY-NC-SA from Shadertoy) noted in file headers. Those licenses apply to shader source only, not the npm package.

## Attribution

Based on [shadertoy-react](https://github.com/mvilledieu/shadertoy-react) by Morgan Villedieu. Shadertoy uniform conventions follow [Shadertoy](https://www.shadertoy.com/).
