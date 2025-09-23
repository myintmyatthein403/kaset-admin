import z from "zod";

export const apiTokenSchema = z.object({
  id: z.uuid().optional().nullable(),
  key: z.string().optional(),
  client_name: z.string(),
  is_active: z.boolean()
})

export type ApiTokenSchemaType = z.infer<typeof apiTokenSchema>;
