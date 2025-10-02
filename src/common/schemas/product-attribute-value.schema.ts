import z from "zod"

export const productAttributeValueSchema = z.object({
  id: z.uuid().optional(),
  attribute: z.string(),
  value: z.string(),
})

export type ProductAttributeValueSchemaType = z.infer<typeof productAttributeValueSchema>
