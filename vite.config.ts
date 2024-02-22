import { resolve } from "path";

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import moduleList from "vite-plugin-module-list";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve("lib/main.ts"),
      fileName: "realue",
      formats: ["es"],
      name: "Realue",
    },
    rollupOptions: {
      external: ["preact"],
      output: {
        globals: {},
      },
    },
  },
  clearScreen: false,
  plugins: [
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: "lib/hooks.ts",
      rootPath: "lib/hooks",
    }),
    moduleList({
      mode: {
        extension: "js",
        language: "ts",
      },
      outputPath: "lib/tools.ts",
      rootPath: "lib/tools",
    }),
    moduleList({
      mode: {
        language: "ts",
        type: true,
      },
      outputPath: "lib/types.ts",
      rootPath: "lib/types",
    }),
    preact(),
  ],
  server: {
    port: 5000,
  },
});
