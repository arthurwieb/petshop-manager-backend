import fastify from 'fastify';
import routes from './routes';
import prismaPlugin from './plugins/prisma.plugin';

export default function buildApp() {
  const app = fastify({ logger: true });

  // Register the Prisma plugin
  app.register(prismaPlugin);

  // Register all routes
  app.register(routes);

  return app;
}