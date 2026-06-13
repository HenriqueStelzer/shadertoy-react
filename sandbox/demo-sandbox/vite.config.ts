import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const localLib = path.resolve(__dirname, "../../lib/glsl-helpers-react.min.js");

export default defineConfig(() => {
  const useLocalLib =
    process.env.LOCAL_GLSL_LIB === "1" && fs.existsSync(localLib);

  return {
    plugins: [react()],
    assetsInclude: ["**/*.frag"],
    resolve: {
      // Opt-in only: LOCAL_GLSL_LIB=1 after `npm run transpile` at repo root.
      // StackBlitz and default dev always resolve glsl-helpers-react from npm.
      alias: useLocalLib ? { "glsl-helpers-react": localLib } : {},
    },
  };
});
