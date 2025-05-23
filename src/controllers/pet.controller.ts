import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';
import { companyIdSchema } from "../schemas/zodschemas";
import { createPetSchema, updatePetSchema } from "../schemas/pet";

export class PetController {
  static async createPet(request: FastifyRequest<{ Body: Prisma.PetCreateInput }>, reply: FastifyReply) {
    try {
      const validated = createPetSchema.parse(request);
      const pet = await request.server.prisma.pet.create({ data: validated.body });
      return reply.send(pet);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create pet' });
    }
  }

  static async getPets(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { company_id } = companyIdSchema.parse(request.query);
      const pets = await request.server.prisma.pet.findMany({
        where: company_id ? { company_id } : {},
      });
      
      return reply.send(pets);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch pets' });
    }
  }

  static async getPetById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const pet = await request.server.prisma.pet.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      pet ? reply.send(pet) : reply.status(404).send({ error: 'Pet not found' })
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch pet' })
    }
  }

  static async deletePet(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deletePet = await request.server.prisma.pet.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      return reply.send({ message: 'Pet deleted successfully' })
    } catch (error) {
      reply.status(500).send({ error: 'Failed to delete pet' });
    }
  }

  static async updatePet(request: FastifyRequest<{ Params: { id: string }; Body: Partial<{ name: string }> }>,reply: FastifyReply) {
    try {
      const { params, body } = updatePetSchema.parse(request);
      const petId = parseInt(params.id, 10);
      const existingPet = await request.server.prisma.pet.findUnique({ where: { id: petId }});
      if (!existingPet) {
        return reply.status(404).send({ error: "Pet not found" });
      }
      const updatedPet = await request.server.prisma.pet.update({ where: { id: petId }, data: body });
      return reply.send({ message: "Pet updated successfully", pet: updatedPet });
    } catch (error) {
      return reply.status(500).send({ error: "Failed to update pet" });
    }
  }
}
