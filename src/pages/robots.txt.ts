import { IS_PROD } from "@lib/consts";
import type { APIRoute } from "astro";

const robotsTxt = IS_PROD
  ? `
User-agent: *
Disallow: /tools/
Disallow: /rss.xml
`.trim()
  : `
User-agent: *
Disallow: /
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
