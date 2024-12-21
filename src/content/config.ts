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

export const collections = { work };
