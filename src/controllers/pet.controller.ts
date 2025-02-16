import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';

export class PetController {
  static async createPet(request: FastifyRequest<{ Body: Prisma.PetCreateInput}>, reply: FastifyReply) {
     try {
      const pet = await request.server.prisma.pet.create({ data: request.body });
      return reply.send(pet);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create pet' });
    }
  }
}