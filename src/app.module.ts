import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { BusinessController } from './business/business.controller';
import { BusinessService } from './business/business.service';

import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';

import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

@Module({
  controllers: [
    AppController,
    AuthController,
    BusinessController,
    BookingController,
    PaymentController
  ],
  providers: [
    AuthService,
    BusinessService,
    BookingService,
    PaymentService
  ],
})
export class AppModule {}