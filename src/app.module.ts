import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { BusinessController } from './business/business.controller';
import { BusinessService } from './business/business.service';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

@Module({
  controllers: [
    AppController,
    AuthController,
    BusinessController
  ],
  providers: [
    AuthService,
    BusinessService
  ],
})
export class AppModule {}

controllers: [
  AppController,
  AuthController,
  BusinessController,
  ServiceController,
  BookingController,
  PaymentController   // ✅ ADD THIS
],
providers: [
  AuthService,
  BusinessService,
  ServiceService,
  BookingService,
  PaymentService      // ✅ ADD THIS
],
