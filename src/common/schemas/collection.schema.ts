import z from "zod";

export const collectionSchema = z.object({
  id: z.uuid().optional().nullable(),
  title: z.string(),
  slug: z.string()
})

export type CollectionSchemaType = z.infer<typeof collectionSchema>;
