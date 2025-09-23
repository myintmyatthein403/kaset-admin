import z from "zod";

export const featuredArtistSchema = z.object({
  id: z.uuid().optional().nullable(),
})

export type FeaturedArtistSchemaSchemaType = z.infer<typeof featuredArtistSchema>;
