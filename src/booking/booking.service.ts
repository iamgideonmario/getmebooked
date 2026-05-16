async getAvailability(serviceId: string, date: Date) {
  // ✅ Step 1: Get service (duration)
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) throw new Error('Service not found');

  // ✅ Step 2: Find business
  const business = await prisma.business.findFirst({
    where: {
      services: {
        some: { id: serviceId },
      },
    },
  });

  if (!business) throw new Error('Business not found');

  // ✅ Step 3: Get working hours
  const day = date.getDay();

  const hours = await prisma.workingHours.findFirst({
    where: {
      businessId: business.id,
      dayOfWeek: day,
    },
  });

  if (!hours) {
    return []; // closed day
  }

  // ✅ Step 4: Get existing bookings
  const bookings = await prisma.booking.findMany({
    where: {
      serviceId,
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  const slots = [];

  // ✅ Step 5: Generate slots inside working hours
  for (let hour = hours.startHour; hour < hours.endHour; hour++) {
    const start = new Date(date);
    start.setHours(hour, 0, 0);

    const end = new Date(start.getTime() + service.duration * 60000);

    // ✅ Check for conflicts
    const conflict = bookings.find(
      b => b.startTime < end && b.endTime > start
    );

    if (!conflict) {
      slots.push(start);
    }
  }

  return slots;
}