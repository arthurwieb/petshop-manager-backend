import { z } from "zod";

export const createPetSchema = z.object({
  body: z.object({
    company_id: z.coerce.number().int(),
    customer_id: z.coerce.number().int(),
    name: z.string(),
    species: z.string(),
    breed: z.string().optional(),
    age: z.number().int().optional(),
    notes: z.string().optional(),
  }),
});


export const updatePetSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
  body: createPetSchema.shape.body.partial(),
});