import z from "zod";

export const productCategorySchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
  slug: z.string(),
})

export type productCategorySchemaType = z.infer<typeof productCategorySchema>;
