import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { Request, Response } from 'express';
import { prisma } from './prisma/prisma.service';

@Controller()
export class AppController {

  @Get()
  async home(@Req() req: Request, @Res() res: Response) {
    const businesses = await prisma.business.findMany({
      include: { services: true },
    });

    return res.render('home', {
      user: (req as any).session?.user,
      businesses,
    });
  }

  @UseGuards(AuthGuard)
  @Get('dashboard')
  async dashboard(@Req() req: Request, @Res() res: Response) {
    const user = (req as any).session.user;
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        service: { include: { business: true } },
        staff: true,
      },
      orderBy: { startTime: 'asc' },
    });

    return res.render('dashboard/index', {
      user,
      bookings,
    });
  }

}