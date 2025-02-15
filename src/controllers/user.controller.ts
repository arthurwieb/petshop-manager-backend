import { PrismaClient } from "@prisma/client/extension";
import { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async CreateUser(request: FastifyRequest, reply: FastifyReply) {
     try {
      const user = await this.prisma.user.create({ data: request.body });
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create user' });
    }
  }
}