
import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';

const createUserSchema = {
  body: {
    type: 'object',
    required: ['company_id', 'name', 'username', 'password', 'email'],
    properties: {
      company_id: {type: 'integer'},
      name: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
    },
  },
};

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', { schema: createUserSchema }, UserController.createUser);
  fastify.get('/users', UserController.getUsers);
  fastify.get('/users/:id', UserController.getUserById);
  fastify.delete('/users/:id', UserController.deleteUser); 
}