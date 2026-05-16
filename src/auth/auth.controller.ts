import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  loginPage(@Res() res: Response) {
    return res.render('auth/login');
  }

  @Get('register')
  registerPage(@Res() res: Response) {
    return res.render('auth/register');
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = await this.authService.register(body.email, body.password);

    (req as any).session.user = user;
    return user;
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      return res.send('Invalid credentials');
    }

    (req as any).session.user = user;
    return res.redirect('/dashboard');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    (req as any).session.destroy(() => {});
    return res.redirect('/');
  }
}