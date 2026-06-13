# Textures

Textures are passed as the `textures` prop array. Channel `n` maps to `iChannel{n}` in your shader.

## Image and video

```javascript
textures={[{ url: "./image.png" }]}
textures={[{ url: "./clip.webm" }]}
```

Supported video extensions: `.mp4`, `.webm`, `.ogv`, `.3gp`.

Videos are muted, looped, and autoplayed. `iChannelTime` reflects `HTMLVideoElement.currentTime` when referenced in the shader.

## Responsive `srcSet`

```javascript
{
  url: "./a.png",
  srcSet: { 1: "./a.png", 2: "./a@2x.png", 3: "./a@3x.png" },
}
// or
{ url: "./a.png", srcSet: "a.png 1x, a@2x.png 2x" }
```

The best density ≤ `devicePixelRatio` is selected. Changing `devicePixelRatio` reloads `srcSet` textures.

## Camera

```javascript
{ type: "camera", facingMode: "user", width: 640, height: 480 }
```

**Requirements:**

- Page served over **HTTPS** (or `localhost`)
- User grants camera permission via browser prompt
- `iChannelTime` uses video `currentTime` when available

Media tracks are stopped on texture dispose / unmount.

## Data texture

```javascript
{
  type: "data",
  width: 256,
  height: 256,
  data: new Uint8Array(256 * 256 * 4),
  format: "rgba8", // or "rgba32f"
}
```

- `rgba8` — `Uint8Array`, works on WebGL1 and WebGL2
- `rgba32f` — `Float32Array`; requires **WebGL2** or `OES_texture_float`

Optional: `wrapS`, `wrapT`, `minFilter`, `magFilter`, `flipY`.

**`flipY`** — When omitted (default), image and video uploads use `UNPACK_FLIP_Y_WEBGL` so `fragCoord`-based UVs match Shadertoy. Pass `flipY: false` or `flipY: 0` to disable the flip. If a texture still looks upside down (some WebGL hosts or older npm builds), try `flipY: 1` explicitly on the texture entry.

## Cube map

```javascript
{
  type: "cube",
  urls: [px, nx, py, ny, pz, nz], // +X, -X, +Y, -Y, +Z, -Z
}
```

Sampler type in GLSL: `samplerCube` on `iChannel0`, etc.

## Keyboard

```javascript
{ type: "keyboard" }
```

Shadertoy-style 256×3 RGBA texture:

| Row | Content |
|-----|---------|
| 0 | Key held state |
| 1 | Key press (cleared each frame) |
| 2 | Toggle on key down |

Use `texelFetch(iChannel0, ivec2(keyCode, row), 0)` (WebGL2). Focus the page and press keys; listeners are on `window`.

## CORS

Remote images/videos need CORS headers. Textures set `crossOrigin = "anonymous"`.

## Filter / wrap constants

```javascript
import GlslCanvas, { LinearFilter, RepeatWrapping } from "glsl-helpers-react";
```
