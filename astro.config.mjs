// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

import arraybuffer from "vite-plugin-arraybuffer";

import { dataUrl } from "vite-plugin-data-url";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), svelte(), react()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: false,
    devImageService: "sharp",
  }),
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
  vite: {
    plugins: [arraybuffer(), dataUrl({ limit: 100000000 })],
  },
});
