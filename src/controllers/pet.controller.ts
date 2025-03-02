import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';
import { z } from 'zod';

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

//Para o patch, precisa ter um objeto zod com tudo optional
export const updatePetSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
  body: createPetSchema.shape.body.partial(),
});

export class PetController {
  static async createPet(request: FastifyRequest<{ Body: Prisma.PetCreateInput}>, reply: FastifyReply) {
     try {
      const { body } = createPetSchema.parse(request);
      const pet = await request.server.prisma.pet.create({ data: body });
      return reply.send(pet);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create pet' });
    }
  }

  static async getPets (request: FastifyRequest, reply: FastifyReply) {
    try {
      const pets = await request.server.prisma.pet.findMany();
      return reply.send(pets);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch pets'});
    }
  }

  static async getPetById (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const pet = await request.server.prisma.pet.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      pet ? reply.send(pet) : reply.status(404).send({ error: 'Pet not found' })
    } catch ( error ) {
      reply.status(500).send({ error: 'Failed to fetch pet' })
    }
  }

  static async deletePet (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deletePet = await request.server.prisma.pet.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      return reply.send({ message: 'Pet deleted successfully'})
    } catch ( error ) {
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