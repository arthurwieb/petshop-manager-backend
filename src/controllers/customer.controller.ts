import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@prisma/client';
import { companyIdSchema } from "../schemas/zodschemas";
import { createCustomerSchema } from "../schemas/customer";

export class CustomerController {
  static async createCustomer(request: FastifyRequest<{ Body: Prisma.CustomerCreateInput}>, reply: FastifyReply) {
     try {
      const { body } = createCustomerSchema.parse(request);
      const customer = await request.server.prisma.customer.create({data: body});
      return reply.send(customer);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create customer' });
    }
  }

  static async getCustomers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { company_id } = companyIdSchema.parse(request.query);
      const customers = await request.server.prisma.customer.findMany({
        where: company_id ? { company_id } : {},
      });
      
      return reply.send(customers);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch customers' });
    }
  }

  static async getCustomerById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const customer = await request.server.prisma.customer.findUnique({
        where: { id: parseInt(request.params.id, 10) },
      });
      customer ? reply.send(customer) : reply.status(404).send({ error: 'Customer not found' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch customer' });
    }
  }

  static async deleteCustomer(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const deletedCustomer = await request.server.prisma.customer.delete({
        where: { id: parseInt(request.params.id, 10) },
      });
      return reply.send({ message: 'Customer deleted successfully', customer: deletedCustomer });
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to delete customer' });
    }
  }
}