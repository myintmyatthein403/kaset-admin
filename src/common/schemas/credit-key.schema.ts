import { z } from 'zod';

export const creditKeySchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
});

export type CreditKeySchemaType = z.infer<typeof creditKeySchema>;
