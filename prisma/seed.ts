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

async function permissions() {
  await prisma.permissions.createMany({
    data: [
      {
        id: '4c172b96-ab31-4eba-a900-baed4dc23606',
        name: 'update-employee'
      },
      {
        id: '2ff85a6a-961f-4533-9def-183d8c435b7d',
        name: 'create-employee'
      },
      {
        id: '5b650cc4-689e-4bc9-8ba9-d2958385dc68',
        name: 'create-menu'
      },
      {
        id: '5f43b2a2-5db6-4497-be1c-677b1b69feae',
        name: 'update-menu'
      },
    ]
  })
}

async function roles_permissions() {
  await prisma.roles_permissions.createMany({
    data: [
      {
        permission_id: '4c172b96-ab31-4eba-a900-baed4dc23606',
        rol_id: 'c96c129c-9c55-4d68-add1-819edde83f0c'
      },
      {
        permission_id: '2ff85a6a-961f-4533-9def-183d8c435b7d',
        rol_id: 'c96c129c-9c55-4d68-add1-819edde83f0c'
      },
      {
        permission_id: '5b650cc4-689e-4bc9-8ba9-d2958385dc68',
        rol_id: 'c96c129c-9c55-4d68-add1-819edde83f0c'
      },
      {
        permission_id: '5f43b2a2-5db6-4497-be1c-677b1b69feae',
        rol_id: 'c96c129c-9c55-4d68-add1-819edde83f0c'
      },
      {
        permission_id: '5b650cc4-689e-4bc9-8ba9-d2958385dc68',
        rol_id: '191fcec0-6e92-4573-a089-1e3a57cd2f3e'
      },
      {
        permission_id: '5f43b2a2-5db6-4497-be1c-677b1b69feae',
        rol_id: '191fcec0-6e92-4573-a089-1e3a57cd2f3e'
      },
    ]
  })
}

async function main() {
  await roles();
  await permissions();
  await roles_permissions();
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
