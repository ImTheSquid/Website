import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("blog");

  const sorted_posts = posts.sort(
    (a, b) => Number(b.data.publishDate) - Number(a.data.publishDate),
  );

  const site_url =
    process.env.PUBLIC_VERCEL_ENV === "production"
      ? "https://jackhogan.me/"
      : "https://staging.jackhogan.me/";

  return rss({
    xmlns: {
      dc: `http://purl.org/dc/elements/1.1/`,
      content: `http://purl.org/rss/1.0/modules/content/`,
      atom: `http://www.w3.org/2005/Atom`,
    },
    title: "Jack's Blog",
    description: "Where Jack writes about whatever's on his mind.",
    site: site!,
    customData:
      `<lastBuildDate>${sorted_posts[0]!.data.publishDate.toUTCString()}</lastBuildDate>` +
      `<atom:link href="${site_url}rss.xml" rel="self" type="application/rss+xml"/>` +
      `<pubDate>${sorted_posts[0]!.data.publishDate.toUTCString()}</pubDate>`,
    items: sorted_posts.map((post) => ({
      ...post.data,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}/`,
    })),
  });
};
