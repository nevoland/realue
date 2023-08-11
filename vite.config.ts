import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
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
});
