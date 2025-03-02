import { FastifyInstance } from 'fastify';
import { PetController } from '../controllers/pet.controller'; 

export default async function petRoutes(fastify: FastifyInstance) {
  fastify.post('/pets', PetController.createPet);
  fastify.get('/pets', PetController.getPets);
  fastify.get('/pets/:id', PetController.getPetById);
  fastify.delete('/pets/:id', PetController.deletePet); 
  fastify.patch('/pets/:id', PetController.updatePet);
}
