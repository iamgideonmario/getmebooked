import { Controller, Get, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('checkout')
  async checkout(@Res() res: Response) {
    const session = await this.paymentService.createCheckout();

    return res.redirect(session.url!);
  }
}