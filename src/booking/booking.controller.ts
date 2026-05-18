import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Body() body: { serviceId: string; startTime: string; staffId?: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = (req as any).session.user;

    const booking = await this.bookingService.createBooking(
      user.id,
      body.serviceId,
      new Date(body.startTime),
      body.staffId,
    );

    const session = await this.paymentService.createCheckout(booking.id);

    return res.redirect(session.url!);
  }

  @Get(':serviceId')
  async get(@Param('serviceId') serviceId: string) {
    return this.bookingService.getBookings(serviceId);
  }

  @Get('availability/:serviceId')
  async availability(
    @Param('serviceId') serviceId: string,
    @Query('date') dateString?: string,
  ) {
    const date = dateString ? new Date(dateString) : new Date();
    return this.bookingService.getAvailability(serviceId, date);
  }

  @Get('new/:businessId')
  async newBooking(@Param('businessId') businessId: string, @Req() req: Request, @Res() res: Response) {
    const services = await prisma.service.findMany({ where: { businessId } });
    const staff = await prisma.staff.findMany({ where: { businessId } });

    return res.render('booking/index', {
      services,
      staff,
      user: (req as any).session?.user,
    });
  }
}
``