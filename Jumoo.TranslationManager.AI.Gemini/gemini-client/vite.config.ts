import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { checker } from "vite-plugin-checker";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "AI",
    },
    outDir: "../wwwroot/App_Plugins/Translations.AI.Gemini",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/, /^@jumoo\/translate/, /^@jumoo\/translate-ai/],
      onwarn: () => {},
    },
  },
  base: "/uSyncExporter/",
  mode: "production",
  plugins: [
    nodeResolve(),
    checker({
      typescript: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/icons/svg/*.js",
          dest: "icons",
        },
      ],
    }),
  ],
});
