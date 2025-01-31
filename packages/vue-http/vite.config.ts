import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ include: ["src"], outDir: "dist/types" })],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
      name: "vue-ohttp",
    },
  },
});
