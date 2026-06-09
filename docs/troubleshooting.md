# Troubleshooting

## Black or empty canvas

1. Open the browser console for `glsl-helpers-react:` shader compile errors.
2. Confirm the parent element has non-zero width and height.
3. Try `webgl="1"` if WebGL2 preprocessing fails on your GPU.
4. Check that referenced uniforms/textures are spelled correctly in the shader.

## Shader compile errors

- WebGL2: use `texture()` not `texture2D()`, or let the preprocessor rewrite Shadertoy syntax.
- User-authored `#version 300 es` shaders need `out vec4 fragColor` or equivalent.
- Invalid `#define` names from `defines` prop are skipped with a warning.

## Textures not loading

- **CORS** — host must send `Access-Control-Allow-Origin` for cross-origin URLs.
- **404** — verify paths relative to your dev server or bundler.
- `onDoneLoadingTextures` still fires on error; check console for load failures.

## Camera not working

- Requires **HTTPS** or `localhost`.
- User must grant permission; denied promises log to console.
- No camera device → `getUserMedia` rejects.

## Keyboard texture not responding

- Click the page to focus; keys are captured on `window`.
- Keyboard demo requires WebGL2 for `texelFetch` in the sample shader.

## Multi-pass issues

- Ensure each `inputs` name matches a prior pass `target`.
- Last pass should omit `target` to draw to screen.
- Self-feedback buffers show one-frame delay (no ping-pong).

## Persistent time resets

- Private browsing may block `localStorage` — falls back to session-only epoch.
- Multiple canvases: use `shared: true` and the same `storageKey` to sync.
- Changing `epoch` in props re-initializes storage when config changes.

## SSR / Next.js

WebGL runs only in the browser. Use dynamic import with `ssr: false`:

```javascript
const GlslCanvas = dynamic(() => import("glsl-helpers-react"), { ssr: false });
```

## Performance

- Unused uniforms skip listeners and GPU uploads — remove unused names from shader source.
- Large shader recompiles on every `fs` change; debounce hot edits in dev tools.

## Mouse position wrong on retina / scaled canvas

- `iMouse` and `iResolution` use **backing-store pixels** (CSS layout size × `devicePixelRatio`), matching `fragCoord` and Shadertoy.
- If mouse-driven shaders look offset, confirm `devicePixelRatio` on `GlslCanvas` matches the value used when sizing the canvas (default `1`).
- Mouse coords account for canvas offset via `getBoundingClientRect`; nested scroll containers are handled on each move.
