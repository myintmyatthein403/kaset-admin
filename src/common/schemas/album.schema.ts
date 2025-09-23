import z from "zod";

export const genreSchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable()
})

export type genreSchemaType = z.infer<typeof genreSchema>;
