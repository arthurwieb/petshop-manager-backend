import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const prismaPlugin: FastifyPluginAsync = async (fastify, options) => {
  // adiciona prims para a instance do fastify
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
};

export default fastifyPlugin(prismaPlugin);