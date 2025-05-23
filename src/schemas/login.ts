import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

export const extendedUserSchema = loginSchema.omit({password: true}).extend({
  name: z.string(),
  id: z.number(),
  company_id: z.number()
});