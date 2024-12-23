// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), svelte()],
  adapter: vercel(),
  site: "https://jackhogan.me",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
