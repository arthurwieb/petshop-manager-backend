import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    company_id: z.coerce.number().int(),
    name: z.string(),
    username: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string().email(),
  }),
});