# Uniforms

Uniforms are injected into the shader **only when referenced** in the fragment shader source (string match at compile time).

## Shadertoy built-ins

| Uniform | Type | Description |
|---------|------|-------------|
| `iTime` | `float` | Seconds since component mount |
| `iTimeDelta` | `float` | Seconds since last frame |
| `iFrame` | `int` | Frame index since mount |
| `iResolution` | `vec2` | Canvas size in pixels |
| `iDate` | `vec4` | year, month, day, seconds in day |
| `iMouse` | `vec4` | xy: position; zw: click position |
| `iChannel0`…`n` | `sampler2D` / `samplerCube` | Texture channels |
| `iChannelResolution` | `vec3[]` | Per-channel resolution |
| `iChannelTime` | `float[]` | Per-channel playback time |

## Extensions (glsl-helpers-react)

| Uniform | Type | Description |
|---------|------|-------------|
| `iDeviceOrientation` | `vec4` | alpha, beta, gamma, `window.orientation` |
| `iPersistentTime` | `float` | Seconds since epoch; requires `persistentTime` prop |

`#define DPR` is set from `devicePixelRatio`.

## Persistent time

```javascript
<GlslCanvas persistentTime fs={fs} />
```

- `iTime` — resets on remount (session clock)
- `iPersistentTime` — continues across refresh via `localStorage`

Options: `epoch`, `storageKey`, `shared`. Falls back to in-memory epoch if storage is unavailable (private browsing).

## Custom uniforms

```javascript
uniforms={{
  uValue: { type: "1f", value: 1.0 },
}}
```

Types: `1f`–`4f`, `1i`–`4i`, `1fv`–`4fv`, `1iv`–`4iv`, `Matrix2fv`–`Matrix4fv`.

Custom uniform **values** update every frame without remounting. Changing **types** triggers recompile.
