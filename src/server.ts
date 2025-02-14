import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors);

fastify.get("/", async () => {
  return { message: "Fastify + TypeScript + Prisma isss runniasdasng!" };
});

fastify.get("/users", async () => {  
  return await prisma.user.findMany();
});

fastify.get("/users/create-test", async () => {
  return await prisma.user.create({
    data: {
      id: '1',
      name: "John Doe",
      email: "3eTb9@example.com"
    }
  })
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
