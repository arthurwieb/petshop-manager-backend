import { FastifyInstance } from 'fastify';
import { LoginController } from '../controllers/login.controller'; 

export default async function loginRoutes(fastify: FastifyInstance) {
  fastify.post('/login', LoginController.Register);
}