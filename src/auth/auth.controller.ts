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
  loginPage(@Req() req: Request, @Res() res: Response) {
    return res.render('auth/login', {
      user: (req as any).session?.user,
      error: req.query.error,
    });
  }

  @Get('register')
  registerPage(@Req() req: Request, @Res() res: Response) {
    return res.render('auth/register', {
      user: (req as any).session?.user,
      error: req.query.error,
    });
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.register(body.email, body.password);
      (req as any).session.user = user;
      return res.redirect('/dashboard');
    } catch (error) {
      return res.redirect('/auth/register?error=' + encodeURIComponent('Registration failed'));
    }
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      return res.redirect('/auth/login?error=' + encodeURIComponent('Invalid credentials'));
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