import fastify from 'fastify';
import routes from './routes';
import prismaPlugin from './plugins/prisma.plugin';
import fastifyJwt from "@fastify/jwt";
import loginRoutes from './routes/login.routes';
import cors from '@fastify/cors';

export default function buildApp() {
  const app = fastify();

  app.register(cors, { origin: '*' });
  app.register(prismaPlugin);
  app.register(loginRoutes);
  app.register(routes);

  app.register(fastifyJwt, {
    secret: "RASGUEI",
  });
  
  return app;
}