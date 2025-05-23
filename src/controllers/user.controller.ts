import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';
import { hashPassword } from "../utils/hash";
import { companyIdSchema } from "../schemas/zodschemas";
import { createUserSchema } from "../schemas/user";

export class UserController {
  static async createUser(request: FastifyRequest<{ Body: Prisma.UserCreateInput}>, reply: FastifyReply) {
     try {
      const { body } = createUserSchema.parse(request);
      const { password, email } = body;

      const existingUser = await request.server.prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return reply.status(400).send({ message: "User already exists" });
      }

      body.password = await hashPassword(password);

      const user = await request.server.prisma.user.create({ data: body });
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create user' });
    }
  }

  static async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { company_id } = companyIdSchema.parse(request.query);
      const users = await request.server.prisma.user.findMany({
        where: company_id ? { company_id } : {},
      });
      
      return reply.send(users);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch users' });
    }
  }

  static async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const user = await request.server.prisma.user.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      user ? reply.send(user) : reply.status(404).send({ error: 'User not found' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch user' });
    }
  }

  static async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deletedUser = await request.server.prisma.user.delete({
        where: { id: parseInt(request.params.id, 10) },
      });
      return reply.send({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to delete user' });
    }
  }
}
