import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Body() body: { serviceId: string; startTime: string },
    @Req() req: Request,
  ) {
    const user = (req as any).session.user;

    return this.bookingService.createBooking(
      user.id,
      body.serviceId,
      new Date(body.startTime),
    );
  }

  @Get(':serviceId')
  async get(@Param('serviceId') serviceId: string) {
    return this.bookingService.getBookings(serviceId);
  }

  @Get('availability/:serviceId')
  async availability(@Param('serviceId') serviceId: string) {
    return this.bookingService.getAvailability(serviceId, new Date());
  }
}
``