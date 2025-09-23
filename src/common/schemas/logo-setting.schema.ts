import z from "zod";

export const logoSettingSchema = z.object({
  id: z.uuid().optional().nullable(),
  name: z.string(),
  logo_image: z.object({
    id: z.string()
  }).optional()
})

export type LogoSettingSchemaType = z.infer<typeof logoSettingSchema>;
