import { prisma } from '../prisma/prisma.service';

export class BusinessService {

  async createBusiness(userId: string, name: string) {
    return prisma.business.create({
      data: {
        name,
        ownerId: userId,
      },
    });
  }

  async getAll() {
    return prisma.business.findMany();
  }
}