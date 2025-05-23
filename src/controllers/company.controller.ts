import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';
import { createCompanySchema } from "../schemas/company";

export class CompanyController {
  static async createCompany(request: FastifyRequest<{ Body: Prisma.CompanyCreateInput}>, reply: FastifyReply) {
    try {
      const { body } = createCompanySchema.parse(request);
      const company = await request.server.prisma.company.create({ data: body });
      return reply.send(company);
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