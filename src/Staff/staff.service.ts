import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';
import { addDays } from 'date-fns';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  /**
   * Invite a staff member to a business
   */
  async inviteStaff(
    businessId: string,
    email: string,
  ) {
    const token = crypto.randomBytes(32).toString('hex');

    return this.prisma.staffInvite.create({
      data: {
        email,
        businessId,
        token,
        expiresAt: addDays(new Date(), 1), // 24 hours
      },
    });
  }

  /**
   * Accept staff invitation using email token
   */
  async acceptInvite(token: string, userId: string) {
    const invite = await this.prisma.staffInvite.findUnique({
      where: { token },
    });

    if (!invite) {
      throw new NotFoundException('Invitation not found');
    }

    if (invite.expiresAt < new Date()) {
      throw new ForbiddenException('Invitation expired');
    }

    // Attach user to business as STAFF
    await this.prisma.staff.create({
      data: {
        userId,
        businessId: invite.businessId,
        role: 'STAFF',
      },
    });

    // Remove invite after use
    await this.prisma.staffInvite.delete({
      where: { token },
    });
  }

  /**
   * Get all staff for a business
   */
  async getBusinessStaff(businessId: string) {
    return this.prisma.staff.findMany({
      where: { businessId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  /**
   * Get bookings for a specific staff member (calendar)
   */
  async getStaffCalendar(userId: string) {
    return this.prisma.booking.findMany({
      where: {
        staffId: userId,
      },
      orderBy: {
        startUtc: 'asc',
      },
    });
  }

  /**
   * Assign a booking to a staff member (owner only)
   */
  async assignBooking(
    bookingId: string,
    staffUserId: string,
    businessId: string,
  ) {
    const staff = await this.prisma.staff.findFirst({
      where: {
        userId: staffUserId,
        businessId,
      },
    });

    if (!staff) {
      throw new ForbiddenException('Staff not part of this business');
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        staffId: staffUserId,
      },
    });
  }
}