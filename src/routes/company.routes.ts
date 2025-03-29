import { FastifyInstance } from 'fastify';
import { CompanyController } from '../controllers/company.controller';

export default async function companyRoutes(fastify: FastifyInstance) {
  fastify.post('/companies', CompanyController.createCompany);
  fastify.get('/companies', CompanyController.getCompanies);
  fastify.get('/companies/:id', CompanyController.getCompanyById);
  fastify.delete('/companies/:id', CompanyController.deleteCompany); 
}