import { z } from "zod";

export const companyIdSchema = z.object({
  company_id: z.coerce.number().int().optional(),
});