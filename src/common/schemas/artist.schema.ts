import z from "zod";

export const artistSchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
  profile_image: z.object({
    id: z.string()
  }).optional(),
  cover_image: z.object({
    id: z.string()
  }).optional(),
})

export type ArtistSchemaType = z.infer<typeof artistSchema>;
