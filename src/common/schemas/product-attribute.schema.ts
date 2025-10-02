import z from "zod"

export const productAttributeSchema = z.object({
  id: z.uuid().optional(),
  name: z.string()
})

export type ProductAttributeSchemaType = z.infer<typeof productAttributeSchema>
