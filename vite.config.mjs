// vite.config.mjs
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // Корень Vite = папка с index.html, main.tsx, theme.css
  root: path.resolve(__dirname, "src/renderer"),
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
    },
  },
  build: {
    // prod-сборка renderer-а
    outDir: path.resolve(__dirname, "dist/renderer"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
