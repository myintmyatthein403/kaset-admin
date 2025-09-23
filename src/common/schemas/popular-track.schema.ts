import z from "zod";

export const popularTrackSchema = z.object({
  id: z.uuid().optional().nullable(),
})

export type PopularTrackSchemaSchemaType = z.infer<typeof popularTrackSchema>;
