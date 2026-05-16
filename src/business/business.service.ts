import { prisma } from '../prisma/prisma.service';

export class BusinessService {

 async createBusiness(userId: string, name: string, city: string)
`` {
    return prisma.business.create({
      data: {
        name,
        ownerId: userId,
        slug: name.toLowerCase().replace(/\s+/g, '-'), // ✅ auto slug
        city: "unknown", // ✅ temporary default
      },
    });
  }

  async getAll() {
    return prisma.business.findMany();
  }
}