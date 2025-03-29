import { FastifyInstance } from 'fastify';
import { CustomerController } from '../controllers/customer.controller';

export default async function customerRoutes(fastify: FastifyInstance) {
  fastify.post('/customers', CustomerController.createCustomer);
  fastify.get('/customers', CustomerController.getCustomers);
  fastify.get('/customers/:id', CustomerController.getCustomerById);
  fastify.delete('/customers/:id', CustomerController.deleteCustomer); 
}