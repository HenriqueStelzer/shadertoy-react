import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  assetsInclude: ["**/*.frag"],
  resolve: {
    // Dev only: local transpiled lib (npm run transpile). Production / StackBlitz use npm.
    alias:
      command === "serve"
        ? {
            "glsl-helpers-react": path.resolve(
              __dirname,
              "../../lib/glsl-helpers-react.min.js",
            ),
          }
        : {},
  },
}));
