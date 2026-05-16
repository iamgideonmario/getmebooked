import { Controller, Post, Get, Param, Body, Req, Res } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post(':bookingId')
  async submitReview(
    @Param('bookingId') bookingId: string,
    @Body() body,
    @Req() req,
    @Res() res,
  ) {
    await this.reviewsService.createReview(
      bookingId,
      req.user.id,
      Number(body.rating),
      body.comment,
    );

    return res.redirect('/dashboard');
  }

  @Get('business/:businessId')
  async businessReviews(
    @Param('businessId') businessId: string,
    @Res() res,
  ) {
    const reviews = await this.reviewsService.getBusinessReviews(businessId);
    return res.render('business/reviews', { reviews });
  }
}