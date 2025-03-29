
import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', UserController.createUser);
  fastify.get('/users', UserController.getUsers);
  fastify.get('/users/:id', UserController.getUserById);
  fastify.delete('/users/:id', UserController.deleteUser); 

  fastify.get("/profile", async (req) => {
    return req.user;
  });
}