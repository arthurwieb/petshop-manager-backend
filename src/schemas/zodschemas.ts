import { z } from "zod";
//se quiser dá para deixar tudo aqui dentro e importar, mas vamos decidir isso ainda.
const createCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    address: z.string().optional(),
  }),
});

const createUserSchema = z.object({
  body: z.object({
    company_id: z.number().int(),
    name: z.string(),
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
  }),
});

const createCustomerSchema = z.object({
  body: z.object({
    company_id: z.number(),
    name: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
  }),
});

const createPetSchema = z.object({
  body: z.object({
    company_id: z.number().int(),
    customer_id: z.number().int(),
    name: z.string(),
    species: z.string(),
    breed: z.string().optional(),
    age: z.number().int().optional()
  }),
});


export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type CreatePetSchema = z.infer<typeof createPetSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;