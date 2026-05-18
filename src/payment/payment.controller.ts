import { Controller, Get, Res, Post, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response, Request } from 'express';
import { prisma } from '../prisma/prisma.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('checkout')
  async checkout(@Res() res: Response) {
    const session = await this.paymentService.createCheckout('manual');

    return res.redirect(session.url!);
  }

  @Get('success')
  async success(@Req() req: Request, @Res() res: Response) {
    const bookingId = (req.query.bookingId as string) || null;

    if (bookingId) {
      await prisma.booking.update({ where: { id: bookingId }, data: { paid: true } });
    }

    return res.render('payment/success', {
      bookingId,
      user: (req as any).session?.user,
    });
  }

  @Get('cancel')
  async cancel(@Req() req: Request, @Res() res: Response) {
    return res.render('payment/cancel', {
      user: (req as any).session?.user,
    });
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string | undefined;

    let payload: Buffer | string = (req as any).rawBody || req.body;
    if (typeof payload !== 'string' && Buffer.isBuffer(payload)) payload = payload.toString();

    try {
      const event = this.paymentService.constructWebhookEvent(payload as string, sig || '');

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
          await prisma.booking.update({ where: { id: bookingId }, data: { paid: true } });
        }
      }

      return res.status(200).send('ok');
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err}`);
    }
  }
}