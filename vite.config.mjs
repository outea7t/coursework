import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  root: "src/renderer",
  base: "./",              
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": resolve(__dirname, "src/domain"),
    },
  },
  build: {
    outDir: "../../dist/renderer",
    emptyOutDir: true,
  },
});
