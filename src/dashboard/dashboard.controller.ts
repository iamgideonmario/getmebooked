@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  @Get()
  index(@Req() req, @Res() res) {
    res.render('dashboard/index', {
      user: req.user
    });
  }

  @Get('availability')
  async availability(@Req() req, @Res() res) {
    const availability = await this.availabilityService.getAvailability(
      req.business.id,
    );

    res.render('dashboard/availability', {
      availability,
      csrfToken: req.csrfToken(),
    });
  }

  @Post('availability')
  async saveAvailability(@Body() body, @Req() req, @Res() res) {
    await this.availabilityService.createAvailability(
      req.business.id,
      Number(body.dayOfWeek),
      body.startTime,
      body.endTime,
    );

    res.redirect('/dashboard/availability');
  }
}
