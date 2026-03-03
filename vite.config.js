import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const webRoot = path.resolve(__dirname, "trading_firm/web");

export default defineConfig({
  root: webRoot,
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  publicDir: false,
  build: {
    outDir: path.resolve(webRoot, "dist"),
    lib: {
      entry: path.resolve(webRoot, "src/main.jsx"),
      formats: ["es"],
      fileName: () => "app.js",
    },
    rollupOptions: {
      output: {
        entryFileNames: "app.js",
        inlineDynamicImports: true,
      },
    },
  },
});
