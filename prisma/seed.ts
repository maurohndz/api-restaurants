import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function roles() {
  await prisma.roles.createMany({
    data: [
      {
        id: 'c96c129c-9c55-4d68-add1-819edde83f0c',
        name: 'admin',
      },
      {
        id: '191fcec0-6e92-4573-a089-1e3a57cd2f3e',
        name: 'employee',
      },
    ],
  });
}

async function main() {
  await roles();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
