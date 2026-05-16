import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * AvailabilityService
 *
 * Handles:
 * - Availability rules (business & staff)
 * - Time validation
 * - Conflict detection
 */
@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  /**
   * Check if a time slot is available
   */
  async isSlotAvailable(
    businessId: string,
    staffId: string | null,
    startUtc: Date,
    endUtc: Date,
  ): Promise<boolean> {
    // 1️⃣ Check business/staff availability rules
    const dayOfWeek = startUtc.getUTCDay();
    const startTime = startUtc.toISOString().substring(11, 16);
    const endTime = endUtc.toISOString().substring(11, 16);

    const availability = await this.prisma.availability.findFirst({
      where: {
        businessId,
        OR: [
          { staffId: staffId },
          { staffId: null },
        ],
        dayOfWeek,
        startTime: { lte: startTime },
        endTime: { gte: endTime },
      },
    });

    if (!availability) {
      return false;
    }

    // 2️⃣ Check booking conflicts
    const conflict = await this.prisma.booking.findFirst({
      where: {
        businessId,
        staffId,
        status: 'APPROVED',
        startUtc: { lt: endUtc },
        endUtc: { gt: startUtc },
      },
    });

    return !conflict;
  }

  /**
   * Create availability rule
   */
  async createAvailability(
    businessId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    staffId?: string,
  ) {
    if (startTime >= endTime) {
      throw new ForbiddenException('Invalid time range');
    }

    return this.prisma.availability.create({
      data: {
        businessId,
        staffId: staffId || null,
        dayOfWeek,
        startTime,
        endTime,
      },
    });
  }

  /**
   * Get availability rules
   */
  async getAvailability(businessId: string, staffId?: string) {
    return this.prisma.availability.findMany({
      where: {
        businessId,
        staffId: staffId || null,
      },
      orderBy: {
        dayOfWeek: 'asc',
      },
    });
  }

  /**
   * Remove availability rule
   */
  async deleteAvailability(id: string) {
    return this.prisma.availability.delete({
      where: { id },
    });
  }
}