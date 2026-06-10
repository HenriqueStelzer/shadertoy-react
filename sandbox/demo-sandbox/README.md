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

Local library dev (repo checkout only): run `npm run transpile` at the repo root — Vite picks up `lib/glsl-helpers-react.min.js` when it exists. StackBlitz and standalone sandboxes use the npm package.
