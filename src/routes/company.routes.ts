import { FastifyInstance } from 'fastify';
import { CompanyController } from '../controllers/company.controller';


// isso aqui é um exemplo de um schema feito na mão, vamos fazer isso usando ZOD
// zod também será usado no front-end

const createCompanySchema = {
  body: {
    type: 'object',
    required: ['name'], // Add other required fields here
    properties: {
      name: { type: 'string' },
      address: { type: 'string' },
    },
  },
};

export default async function companyRoutes(fastify: FastifyInstance) {
  fastify.post('/companies', { schema: createCompanySchema }, CompanyController.createCompany);
  fastify.get('/companies', CompanyController.getCompanies);
  fastify.get('/companies/:id', CompanyController.getCompanyById);
  fastify.delete('/companies/:id', CompanyController.deleteCompany); 
}