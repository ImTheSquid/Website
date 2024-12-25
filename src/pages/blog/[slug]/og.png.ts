import { getCollection, type CollectionEntry } from "astro:content";
import type { GetStaticPaths } from "astro";
import { ImageResponse } from "@vercel/og";
import { getOgImage } from "@lib/og";

interface Props {
  params: { slug: string };
  props: CollectionEntry<"blog">;
}

export const getStaticPaths = (async () => {
  const entries = await getCollection("blog");

  return entries.map((e) => ({ params: { slug: e.slug }, props: { ...e } }));
}) satisfies GetStaticPaths;

export async function GET({
  props: {
    data: { title, publishDate },
  },
}: Props) {
  const date = publishDate.toLocaleDateString("en-uk", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  return getOgImage({ title, subtitle: `${date} • Jack Hogan` });
}
