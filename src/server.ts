import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(cors);

fastify.get("/", async () => {
  return { message: "Fastify + TypeScript + Prisma is running!" };
});

fastify.get("/users", async () => {  
  return await prisma.user.findMany();
});

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
