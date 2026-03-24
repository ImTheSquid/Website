import { type VercelConfig, routes } from "@vercel/config/v1";

export const config: VercelConfig = {
  headers: [
    routes.cacheControl("/_astro/(.*)", {
      public: true,
      maxAge: "1y",
      immutable: true,
    }),
    routes.cacheControl("/blog/(.*)/og.png", {
      public: true,
      maxAge: "1y",
      sMaxAge: "1w",
      staleWhileRevalidate: "1d",
    }),
    routes.cacheControl("/og.png", {
      public: true,
      maxAge: "1h",
      sMaxAge: "1w",
      staleWhileRevalidate: "1d",
    }),
    routes.cacheControl("/rss.xml", {
      public: true,
      maxAge: "1h",
      sMaxAge: "1d",
      staleWhileRevalidate: "1d",
    }),
    routes.cacheControl("/robots.txt", {
      public: true,
      maxAge: "1d",
      sMaxAge: "1w",
    }),
  ],
};
