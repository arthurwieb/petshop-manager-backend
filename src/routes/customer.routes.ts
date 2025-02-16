import { FastifyInstance } from 'fastify';
import { CustomerController } from '../controllers/customer.controller';

const createCustomerSchema = {
  body: {
    type: 'object',
    required: ['company_id','name'],
    properties: {
      company_id: {type: 'integer'},
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string' },
    },
  },
};

export default async function customerRoutes(fastify: FastifyInstance) {
  fastify.post('/customers', { schema: createCustomerSchema }, CustomerController.createCustomer);
  fastify.get('/customers', CustomerController.getCustomers);
  fastify.get('/customers/:id', CustomerController.getCustomerById);
}