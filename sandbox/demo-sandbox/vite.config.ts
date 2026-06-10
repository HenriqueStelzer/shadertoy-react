import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const localLib = path.resolve(__dirname, "../../lib/glsl-helpers-react.min.js");

export default defineConfig(({ command }) => {
  const useLocalLib = command === "serve" && fs.existsSync(localLib);

  return {
    plugins: [react()],
    assetsInclude: ["**/*.frag"],
    resolve: {
      // Repo-root `vite dev` only: transpiled lib when present. StackBlitz / build use npm.
      alias: useLocalLib ? { "glsl-helpers-react": localLib } : {},
    },
  };
});
