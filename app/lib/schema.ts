import { z } from 'zod';

export const PortfolioResponseSchema = z.object({
  response: z.object({
    content: z.string(),
    sources: z.array(
      z.object({
        type: z.enum(['project', 'experience', 'education', 'media']),
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        url: z.string().optional(),
      })
    ),
    confidence: z.number().min(0).max(1),
  }),
});
