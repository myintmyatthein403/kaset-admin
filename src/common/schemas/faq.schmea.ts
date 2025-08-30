import { z } from 'zod';

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export type FAQSchemaType = z.infer<typeof faqSchema>;
