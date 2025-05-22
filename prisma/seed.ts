import { PrismaClient } from '@prisma/client';
import { hashPassword } from "../src/utils/hash";

const prisma = new PrismaClient();

const run = async () => {
  // Clear existing data
  await prisma.pet.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  // Seed Companies
  const [company1, company2] = await Promise.all([
    prisma.company.create({
      data: {
        name: 'Pet Paradise',
        address: '123 Main St'
      }
    }),
    prisma.company.create({
      data: {
        name: 'Animal Kingdom',
        address: '456 Oak Ave'
      }
    })
  ]);

  // Seed Users (2 per company)
  const [user1, user2, user3, user4] = await Promise.all([
    prisma.user.create({
      data: {
        company_id: company1.id,
        name: 'Admin User',
        username: 'admin',
        password:  await hashPassword('12345678'),
        email: 'admin@gmail.com'
      }
    }),
    prisma.user.create({
      data: {
        company_id: company1.id,
        name: 'Staff User',
        username: 'staff',
        password: await hashPassword('12345678'),
        email: 'staff@petparadise.com'
      }
    }),
    prisma.user.create({
      data: {
        company_id: company2.id,
        name: 'Manager',
        username: 'manager',
        password: await hashPassword('12345678'),
        email: 'manager@animalkingdom.com'
      }
    }),
    prisma.user.create({
      data: {
        company_id: company2.id,
        name: 'Receptionist',
        username: 'reception',
        password: await hashPassword('12345678'),
        email: 'reception@animalkingdom.com'
      }
    })
  ]);

  // Seed Customers (2 per company)
  const [customer1, customer2, customer3, customer4] = await Promise.all([
    prisma.customer.create({
      data: {
        company_id: company1.id,
        name: 'Alice Johnson',
        phone: '111-1111',
        email: 'alice@example.com'
      }
    }),
    prisma.customer.create({
      data: {
        company_id: company1.id,
        name: 'Bob Smith',
        phone: '222-2222',
        email: 'bob@example.com'
      }
    }),
    prisma.customer.create({
      data: {
        company_id: company2.id,
        name: 'Carol Williams',
        phone: '333-3333',
        email: 'carol@example.com'
      }
    }),
    prisma.customer.create({
      data: {
        company_id: company2.id,
        name: 'David Brown',
        phone: '444-4444',
        email: 'david@example.com'
      }
    })
  ]);

  // Seed Pets (2 per customer)
  await Promise.all([
    // Company 1 Pets
    prisma.pet.create({
      data: {
        company_id: company1.id,
        customer_id: customer1.id,
        name: 'Fluffy',
        species: 'Cat',
        breed: 'Persian',
        age: 3
      }
    }),
    prisma.pet.create({
      data: {
        company_id: company1.id,
        customer_id: customer1.id,
        name: 'Rex',
        species: 'Dog',
        breed: 'Labrador',
        age: 5
      }
    }),
    prisma.pet.create({
      data: {
        company_id: company1.id,
        customer_id: customer2.id,
        name: 'Whiskers',
        species: 'Cat',
        breed: 'Siamese',
        age: 2
      }
    }),
    prisma.pet.create({
      data: {
        company_id: company1.id,
        customer_id: customer2.id,
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 4
      }
    }),

    // Company 2 Pets
    prisma.pet.create({
      data: {
        company_id: company2.id,
        customer_id: customer3.id,
        name: 'Max',
        species: 'Dog',
        breed: 'Beagle',
        age: 1
      }
    }),
    prisma.pet.create({
      data: {
        company_id: company2.id,
        customer_id: customer3.id,
        name: 'Luna',
        species: 'Cat',
        breed: 'Maine Coon',
        age: 2
      }
    }),
    prisma.pet.create({
      data: {
        company_id: company2.id,
        customer_id: customer4.id,
        name: 'Charlie',
        species: 'Dog',
        breed: 'Poodle',
        age: 3
      }
    }),
    prisma.pet.create({
      data: {
        company_id: company2.id,
        customer_id: customer4.id,
        name: 'Milo',
        species: 'Cat',
        breed: 'Tabby',
        age: 1
      }
    })
  ]);

  console.log('Database seeded successfully!');
}

if (require.main === module) {
  run().then(() => {
    console.log('Data seed complete');
    process.exit();
  });
}