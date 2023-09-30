import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import moduleList from "vite-plugin-module-list";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    moduleList({
      rootPath: "lib/hooks",
      outputPath: "lib/hooks.ts",
      mode: "named-static-no-extension",
    }),
    moduleList({
      rootPath: "lib/tools",
      outputPath: "lib/tools.ts",
      mode: "named-static-no-extension",
    }),
    moduleList({
      rootPath: "lib/constants",
      outputPath: "lib/constants.ts",
      mode: "named-static-no-extension",
    }),
    preact(),
  ],
  build: {
    lib: {
      formats: ["es"],
      entry: resolve(__dirname, "lib/main.ts"),
      name: "Realue",
      fileName: "realue",
    },
    rollupOptions: {
      external: ["preact"],
      output: {
        globals: {},
      },
    },
  },
  server: {
    port: 5000,
  },
});
