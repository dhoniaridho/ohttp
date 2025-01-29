import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["src"], outDir: "dist/types" })],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
      name: "react-ohttp",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
