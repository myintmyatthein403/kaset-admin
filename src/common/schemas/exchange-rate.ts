import z from "zod";

export const exchangeRateSchema = z.object({
  id: z.uuid().optional().nullable(),
  currency: z.string(),
  rate: z.number(),
})

export type ExchangeRateSchemaType = z.infer<typeof exchangeRateSchema>;
