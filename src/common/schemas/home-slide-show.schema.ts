import { z } from 'zod';

export const homeSlideShowSchema = z.object({
  title: z.string(),
  sub_title: z.string().optional(),
  button_text: z.string().optional(),
  url: z.string().optional(),
  slideShowImage: z.file().nullable().optional(),
  is_active: z.boolean().default(true),
  image: z.object({
    id: z.string()
  }).optional()
});

export type HomeSlideShowSchemaType = z.infer<typeof homeSlideShowSchema>;
