import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();
async function main() {
  const userTest = await prisma.user.upser({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'user_test@seeder.com',
      name: 'user_test',
      address: 'test',
      password: 'password'
    },
  })
}

main().then(async () => {
  await.prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
