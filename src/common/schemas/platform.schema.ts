import { z } from 'zod';

export const platformSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  icon: z.object({
    id: z.string()
  }).optional()
});

export type PlatformSchemaType = z.infer<typeof platformSchema>;
