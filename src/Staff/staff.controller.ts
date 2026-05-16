@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post('invite')
  async invite(@Body('email') email: string, @Req() req) {
    await this.staffService.inviteStaff(req.business.id, email);
    return { success: true };
  }

  @Get('calendar')
  async calendar(@Req() req, @Res() res) {
    const bookings = await this.staffService.getStaffCalendar(req.user.id);
    res.render('staff/calendar', { bookings });
  }
}
