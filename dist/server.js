"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const client_1 = require("@prisma/client");
const fastify = (0, fastify_1.default)({ logger: true });
const prisma = new client_1.PrismaClient();
fastify.register(cors_1.default);
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
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
