@Get('check')
async check(@Query() q) {
  return this.availabilityService.isSlotAvailable(
    q.businessId,
    null,
    new Date(q.start),
    new Date(q.end),
  );
}