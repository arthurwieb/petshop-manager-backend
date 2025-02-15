import { PrismaClient } from "@prisma/client/extension";
import { FastifyReply, FastifyRequest } from "fastify";

export class CustomerController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async CreateCustomer(request: FastifyRequest, reply: FastifyReply) {
     try {
      const customer = await this.prisma.customer.create({ data: request.body });
      return reply.send(customer);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create customer' });
    }
  }
}