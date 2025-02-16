import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';

export class UserController {
  static async createUser(request: FastifyRequest<{ Body: Prisma.UserCreateInput}>, reply: FastifyReply) {
     try {
      const user = await request.server.prisma.user.create({ data: request.body });
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create user' });
    }
  }
}