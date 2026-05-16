import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Get('login')
loginPage(@Res() res: Response) {
  return res.render('auth/login');
}
@Get()
async bookingPage(@Res() res) {
  const services = await prisma.service.findMany();
  return res.render('booking/index', { services });
}

@Get('register')
registerPage(@Res() res: Response) {
  return res.render('auth/register');
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }, @Req() req: Request) {
    const user = await this.authService.register(body.email, body.password);

    (req as any).session.user = user;

    return { message: 'User registered', user };
  }

  @Post('login')
async login(@Body() body, @Req() req, @Res() res) {
  const user = await this.authService.validateUser(body.email, body.password);

  if (!user) {
    return res.send("Invalid credentials");
  }

  req.session.user = user;
  return res.redirect('/dashboard');
}
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    (req as any).session.user = user;

    return { message: 'Logged in', user };
  }

  @Get('logout')
  logout(@Req() req: Request) {
    (req as any).session.destroy(() => {});
    return { message: 'Logged out' };
  }
}

@UseGuards(AuthGuard)
@Get('dashboard')
dashboard(@Req() req, @Res() res) {
  return res.render('dashboard/index', {
    user: req.session.user,
  });
}

@Get()
async bookingPage(@Res() res) {
  const services = await prisma.service.findMany();
  return res.render('booking/index', { services });
}