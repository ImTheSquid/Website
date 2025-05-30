import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        theme: "oklch(75% 0.1332 226.06)",
      },
    },
    fontFamily: {
      sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      serif: ["Lora", ...defaultTheme.fontFamily.serif],
      title: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
      mono: ["DM Mono", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
  safelist: ["hidden", "flex"],
};
