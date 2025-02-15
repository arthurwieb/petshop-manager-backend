import companyRoutes from './company.routes';
import { FastifyInstance } from 'fastify';

/*
  O index serve como agregador de routes, ai para chamar lá no server.ts é mais facil
*/

export default async function routes(fastify: FastifyInstance) { 
  fastify.register(companyRoutes);
}