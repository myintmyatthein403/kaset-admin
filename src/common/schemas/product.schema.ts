import z from "zod";

export const productSchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
  slug: z.string(),
  productImages: z.object({
    id: z.string()
  }).optional(),
  product_images: z.array(z.object({
    id: z.string()
  }).optional())
})

export type productSchemaType = z.infer<typeof productSchema>;
