import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { verifyPassword } from "../utils/hash";
import { loginSchema, extendedUserSchema } from "../schemas/login";

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