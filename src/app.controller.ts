import { Controller, Get, Res, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  home(@Res() res) {
    res.render('home', {
      title: 'Home',
      user: null,
      businesses: [
        { name: 'Demo Salon', slug: 'demo-salon', city: 'Toronto', country: 'Canada' }
      ]
    });
  }
}