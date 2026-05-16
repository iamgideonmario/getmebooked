import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';

import { BusinessService } from './business.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma.service';
@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Body() body: { name: string },
    @Req() req: Request,
  ) {
    const user = (req as any).session.user;

    return this.businessService.createBusiness(user.id, body.name);
  }

  @Get()
  async all(@Res() res: Response) {
    const businesses = await this.businessService.getAll();

    return res.render('booking/business', {
      businesses,
    });
}
}