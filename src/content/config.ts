import { z, defineCollection } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string(),
    timePeriod: z.coerce.string(),
    order: z.number(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date().optional(),
    tags: z.array(z.string()),
    lastUpdateDate: z.date().optional(),
    description: z.string(),
    externalUrl: z.string().url().optional(),
  }),
});

export const collections = { work, blog };
