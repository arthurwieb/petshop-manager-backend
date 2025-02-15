import { PrismaClient } from "@prisma/client/extension";
import { FastifyReply, FastifyRequest } from "fastify";

export class PetController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async CreatePet(request: FastifyRequest, reply: FastifyReply) {
     try {
      const pet = await this.prisma.pet.create({ data: request.body });
      return reply.send(pet);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create pet' });
    }
  }
}