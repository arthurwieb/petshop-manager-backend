import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';
import { z } from 'zod';
const createCompanySchema = z.object({
  body: z.object({
    name: z.string(),
    address: z.string(),
  }),
});

export class CompanyController {
  static async createCompany(request: FastifyRequest<{ Body: Prisma.CompanyCreateInput}>, reply: FastifyReply) {
    try {
      // acessa o prisma porque lá no PLUGIN adicionamos ele na instance do fastify(server)
      // const company = await request.server.prisma.company.create({ data: request.body });
      
      const { body } = createCompanySchema.parse(request);
      await request.server.prisma.company.create( {data: body} );

      return reply.send(body);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create company' });
    }
  }

  static async getCompanies(request: FastifyRequest, reply: FastifyReply) {
    try {
      const companies = await request.server.prisma.company.findMany();
      return reply.send(companies);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch companies' });
    }
  }

  static async getCompanyById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const company = await request.server.prisma.company.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      company ? reply.send(company) : reply.status(404).send({ error: 'Company not found' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch company' });
    }
  }

  static async deleteCompany(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deletedCompany = await request.server.prisma.company.delete({
        where: { id: parseInt(request.params.id, 10) },
      });
      return reply.send({ message: 'Company deleted successfully', company: deletedCompany });
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to delete company' });
    }
  }
}