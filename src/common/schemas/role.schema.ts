import z from "zod";

export const roleSchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
})

export type RoleSchemaType = z.infer<typeof roleSchema>;
