import { z } from "zod";

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    address: z.string().optional(),
  }),
});
