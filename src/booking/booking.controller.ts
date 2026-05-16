@Post('create')
async create(
  @Body() body: { serviceId: string; staffId: string; startTime: string },
  @Req() req: Request
) {
  const user = (req as any).session.user;

  return this.bookingService.createBooking(
    user.id,
    body.serviceId,
    body.staffId,
    new Date(body.startTime),
  );
}
@Get('availability/:serviceId')
async availability(
  @Param('serviceId') serviceId: string,
) {
  return this.bookingService.getAvailability(serviceId, new Date());
}