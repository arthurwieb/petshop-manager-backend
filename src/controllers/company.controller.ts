import { PrismaClient } from "@prisma/client/extension";
import { FastifyReply, FastifyRequest } from "fastify";

export class CompanyController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async CreateCompany(request: FastifyRequest, reply: FastifyReply) {
     try {
      const company = await this.prisma.company.create({ data: request.body });
      return reply.send(company);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create company' });
    }
  }
}