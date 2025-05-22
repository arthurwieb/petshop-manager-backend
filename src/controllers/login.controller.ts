import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { verifyPassword } from "../utils/hash";
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

const extendedUserSchema = loginSchema.omit({password: true}).extend({
  name: z.string(),
  id: z.number(),
  company_id: z.number()
});

export class LoginController {
  static async Register(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.body)
    const { email, password } = loginSchema.parse(request.body);
    console.log(email)
    console.log(password)
    const existingUser = await request.server.prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return reply.status(401).send({ message: "User not found" });
    }

    const isPasswordValid = await verifyPassword(password, existingUser.password);

    if (!isPasswordValid) {
      return reply.status(401).send({ message: "Invalid password" });
    }

    const loggedUser = extendedUserSchema.parse(existingUser);
    const token = request.server.jwt.sign({ id: existingUser.id, email: existingUser.email });

    return reply.status(200).send({ ...loggedUser, token });
  }
}