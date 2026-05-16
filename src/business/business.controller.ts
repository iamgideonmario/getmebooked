import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() body, @Req() req) {
    const user = (req as any).session.user;

    return this.businessService.createBusiness(user.id, body.name);
  }

  @Get()
  all() {
    return this.businessService.getAll();
  }
}