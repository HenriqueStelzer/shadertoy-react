# Multi-pass rendering

Use the `passes` prop instead of `fs` for Shadertoy-style buffer pipelines.

```javascript
<GlslCanvas
  passes={[
    { fs: bufferA, target: "bufferA" },
    { fs: bufferB, inputs: ["bufferA"], target: "bufferB" },
    { fs: imageShader, inputs: ["bufferA", "bufferB"] },
  ]}
/>
```

## Pass schema

| Field | Description |
|-------|-------------|
| `fs` | Fragment shader for this pass |
| `target` | Named framebuffer (omit on last pass → screen) |
| `inputs` | Names of prior buffers → `iChannel0`, `iChannel1`, … |

The optional `vs` prop applies to all passes. Built-in uniforms and `textures` are available in every pass.

## Texture units

For each pass:

- `inputs[0]` → texture unit 0 → `iChannel0`
- `inputs[1]` → texture unit 1 → `iChannel1`
- Prop `textures[n]` → unit `inputs.length + n` → uniform `iChannel{inputs.length + n}`

When a pass has both buffer `inputs` and prop `textures`, channels are shared: buffers occupy `iChannel0..N-1`, prop textures start at `iChannelN`.

## Framebuffer pool

`FramebufferPool` creates one RGBA texture + FBO per `target` name. Buffers resize with the canvas.

## Limitations

1. **No ping-pong** — Each `target` is a single buffer. Feedback shaders read the **previous frame** (one frame delay), not same-frame ping-pong like full Shadertoy.
2. **No `iChannelResolution` for buffers** — Buffer sizes match the canvas; only prop textures populate `iChannelResolution`. In multi-pass passes with `inputs`, `iChannelResolution` / `iChannelTime` indices still follow the prop `textures` array (not the channel offset).
3. **Experimental** — Complex graphs may need custom FBO wiring outside this API.

## Clock uniforms

`iTime`, `iFrame`, and `iTimeDelta` advance **once per frame**, not once per pass.

## Example

See `examples/src/shaders/multiPass.js` and the multi-pass tile in `npm start`.
