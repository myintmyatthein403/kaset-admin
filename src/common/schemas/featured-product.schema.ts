import z from "zod";

export const featuredProductSchema = z.object({
  id: z.uuid().optional().nullable(),
})

export type FeaturedProductSchemaSchemaType = z.infer<typeof featuredProductSchema>;
