import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    place: z.enum(['Portland', 'Astoria']),
    color: z.coerce.number().int().min(1).max(6).default(1),
    excerpt: z.string(),
    going: z.string(),
    worked: z.string(),
    now: z.string(),
    serviceLabel: z.string(),
    serviceHref: z.string().default('/services'),
    seoTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    sample: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { stories };
