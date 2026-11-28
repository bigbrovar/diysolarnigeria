import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // Group members whose posts the article is built from.
        contributors: z.array(z.string()).optional(),
        // When the source discussions took place, e.g. "May 2023, November 2024".
        discussed: z.string().optional(),
      }),
    }),
  }),
};
