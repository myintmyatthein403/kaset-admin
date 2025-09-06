import z from "zod";

export const productSchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
  slug: z.string(),
  product_image: z.object({
    id: z.string()
  }).optional()
})

export type productSchemaType = z.infer<typeof productSchema>;
