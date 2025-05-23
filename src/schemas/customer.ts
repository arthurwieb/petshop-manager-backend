import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    company_id: z.coerce.number(),
    name: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
  }),
});