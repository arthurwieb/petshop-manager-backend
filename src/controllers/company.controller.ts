import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';

export class CompanyController {
  static async createCompany(request: FastifyRequest<{ Body: Prisma.CompanyCreateInput}>, reply: FastifyReply) {
    try {
      // acessa o prisma porque lá no PLUGIN adicionamos ele na instance do fastify(server)
      const company = await request.server.prisma.company.create({ data: request.body });
      return reply.send(company);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create company' });
    }
  }
}