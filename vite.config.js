import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig({
  base: "./",
  server: {
    port: 5000,
    host: true,
  },
  plugins: [
    svelte({
      preprocess: [preprocess()],
    }),
  ],
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
});
