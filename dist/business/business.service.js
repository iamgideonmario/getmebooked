"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
class BusinessService {
    async createBusiness(userId, name) {
        return prisma_service_1.prisma.business.create({
            data: {
                name,
                ownerId: userId,
                slug: name.toLowerCase().replace(/\s+/g, '-'),
                city: 'unknown',
            },
        });
    }
    async getAll() {
        return prisma_service_1.prisma.business.findMany();
    }
}
exports.BusinessService = BusinessService;
