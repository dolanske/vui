/// <reference types="vitest" />
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === "pages";

  return {
    test: {
      environment: "jsdom",
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    plugins: [
      vue(),
      // Only generate type definitions for library builds
      !isGitHubPages &&
        dts({
          tsconfigPath: "./tsconfig.app.json",
        }),
    ].filter(Boolean),
    build: {
      // For GitHub Pages, build a regular site instead of a library
      ...(isGitHubPages
        ? {
            assetsDir: "assets",
            outDir: "dist",
            assetsInlineLimit: 4096,
            rollupOptions: {
              output: {
                assetFileNames: "assets/[name]-[hash].[ext]",
                chunkFileNames: "assets/[name]-[hash].js",
                entryFileNames: "assets/[name]-[hash].js",
              },
            },
          }
        : {
            lib: {
              entry: resolve(__dirname, "src", "index.ts"),
              name: "vui",
              fileName: "vui",
              formats: ["es"],
            },
            rollupOptions: {
              external: ["vue", "sass"],
              input: ["./src/index.ts"],
              output: {
                dir: "dist",
                exports: "named",
              },
            },
          }),
    },
  };
});
