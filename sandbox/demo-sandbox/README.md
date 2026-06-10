# Demo sandbox

Matches [upstream shadertoy-react CodeSandbox Demos](https://codesandbox.io/s/434qm4x4w0):

- Fullscreen `GlslCanvas` per route
- **+ More** dropdown (Component Props + Built-ins Uniforms)

For the expanded **15-tile** grid (based on [upstream `examples/`](https://github.com/mvilledieu/shadertoy-react/tree/master/examples)), see our [Demo](../../README.md#demo) — GitHub Pages or `npm start` in the repo root.

StackBlitz: https://stackblitz.com/github/HenriqueStelzer/glsl-helpers-react/tree/test/sandbox-playground/sandbox/demo-sandbox

```bash
npm install
npm run dev
```

Local library dev (repo checkout only): `npm run transpile` at the repo root, then:

```bash
LOCAL_GLSL_LIB=1 npm run dev
```

StackBlitz and default `npm run dev` always use the npm package.

**Textures upside down?** Image channels may render flipped depending on the npm build; pass `flipY: 1` on the texture prop or see [textures.md](../../docs/textures.md).
