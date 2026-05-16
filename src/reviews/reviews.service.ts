import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a review for a completed booking
   */
  async createReview(
    bookingId: string,
    userId: string,
    rating: number,
    comment: string,
  ) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Verify booking belongs to user and is approved
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        customerId: userId,
        status: 'APPROVED',
      },
    });

    if (!booking) {
      throw new ForbiddenException('You cannot review this booking');
    }

    // Ensure only one review per booking
    const existingReview = await this.prisma.review.findUnique({
      where: {
        bookingId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('Review already submitted');
    }

    return this.prisma.review.create({
      data: {
        bookingId,
        businessId: booking.businessId,
        rating,
        comment,
      },
    });
  }

  /**
   * Get all reviews for a business
   */
  async getBusinessReviews(businessId: string) {
    return this.prisma.review.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Admin: delete an inappropriate review
   */
  async deleteReview(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.delete({
      where: { id: reviewId },
    });
  }
}