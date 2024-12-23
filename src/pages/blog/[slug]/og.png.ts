import { getCollection, type CollectionEntry } from "astro:content";
import type { GetStaticPaths } from "astro";
import { ImageResponse } from "@vercel/og";
import { getOgImage } from "@lib/og";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

export const getStaticPaths = (async () => {
  const entries = await getCollection("blog");

  return entries.map((e) => ({ params: { slug: e.slug }, props: { ...e } }));
}) satisfies GetStaticPaths;

export async function GET(data) {
  return getOgImage({ title: "Jack Hogan", subtitle: "Develooper" });
}
