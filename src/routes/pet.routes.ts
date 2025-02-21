import { FastifyInstance } from 'fastify';
import { PetController } from '../controllers/pet.controller'; 


// isso aqui é um exemplo de um schema feito na mão, vamos fazer isso usando ZOD
// zod também será usado no front-end

const createPetSchema = {
  body: {
    type: 'object',
    required: ['name'], // Add other required fields here
    properties: {
      name: { type: 'string' }
    },
  },
};

export default async function petRoutes(fastify: FastifyInstance) {
  fastify.post('/companies', { schema: createPetSchema }, PetController.createPet);
  fastify.get('/companies', PetController.getPets);
  fastify.get('/companies/:id', PetController.getPetById);
  fastify.delete('/companies/:id', PetController.deletePet); 
  fastify.patch('/companies', { schema: createPetSchema }, PetController.updatePet);
}
