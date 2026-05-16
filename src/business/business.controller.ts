import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Body() body: { name: string; city: string },
    @Req() req: Request
  ) {
    const user = (req as any).session.user;

    return this.businessService.createBusiness(user.id, body.name, body.city);
  }

  @Get()
  async all() {
    return this.businessService.getAll();
  }
}