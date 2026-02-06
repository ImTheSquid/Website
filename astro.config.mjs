// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

import svelte from "@astrojs/svelte";

import arraybuffer from "vite-plugin-arraybuffer";

import { dataUrl } from "vite-plugin-data-url";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";
import astroCompress from "gab-astro-compress";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte(), react(), icon(), astroCompress()],
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
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [arraybuffer(), dataUrl({ limit: 100000000 }), tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "DM Sans",
        cssVariable: "--font-sans",
        weights: ["100 1000"],
        fallbacks: ["sans-serif"],
      },
      {
        provider: fontProviders.google(),
        name: "Lora",
        cssVariable: "--font-serif",
        weights: ["400 700"],
        fallbacks: ["serif"],
      },
      {
        provider: fontProviders.google(),
        name: "DM Mono",
        cssVariable: "--font-mono",
        weights: [300, 400, 500],
        fallbacks: ["monospace"],
      },
      {
        provider: fontProviders.google(),
        name: "DM Serif Display",
        cssVariable: "--font-title",
        fallbacks: ["serif"],
      },
    ],
  },
});
