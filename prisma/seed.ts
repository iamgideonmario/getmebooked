import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('seedpassword', 10);

  const user = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      email: 'owner@example.com',
      passwordHash,
    },
  });

  const business = await prisma.business.upsert({
    where: { slug: 'demo-business' },
    update: {},
    create: {
      name: 'Demo Business',
      slug: 'demo-business',
      city: 'Demo City',
      ownerId: user.id,
    },
  });

  const service = await prisma.service.upsert({
    where: { id: 'service-demo-1' },
    update: {},
    create: {
      id: 'service-demo-1',
      name: 'Demo Service',
      duration: 60,
      businessId: business.id,
    },
  });

  const staff1 = await prisma.staff.upsert({
    where: { id: 'staff-demo-1' },
    update: {},
    create: {
      id: 'staff-demo-1',
      name: 'Alice',
      businessId: business.id,
    },
  });

  const staff2 = await prisma.staff.upsert({
    where: { id: 'staff-demo-2' },
    update: {},
    create: {
      id: 'staff-demo-2',
      name: 'Bob',
      businessId: business.id,
    },
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
