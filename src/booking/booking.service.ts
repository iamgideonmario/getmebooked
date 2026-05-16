import { prisma } from '../prisma/prisma.service';

export class BookingService {

  async createBooking(userId: string, serviceId: string, startTime: Date) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error('Service not found');

    const endTime = new Date(startTime.getTime() + service.duration * 60000);

    const conflict = await prisma.booking.findFirst({
      where: {
        serviceId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });

    if (conflict) {
      throw new Error('Time slot already booked');
    }

    return prisma.booking.create({
      data: {
        userId,
        serviceId,
        startTime,
        endTime,
      },
    });
  }

  async getBookings(serviceId: string) {
    return prisma.booking.findMany({
      where: { serviceId },
    });
  }

  async getAvailability(serviceId: string, date: Date) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) throw new Error('Service not found');

    const bookings = await prisma.booking.findMany({
      where: {
        serviceId,
      },
    });

    const slots = [];

    for (let hour = 9; hour < 17; hour++) {
      const start = new Date(date);
      start.setHours(hour, 0, 0);

      const end = new Date(start.getTime() + service.duration * 60000);

      const conflict = bookings.find(
        b => b.startTime < end && b.endTime > start,
      );

      if (!conflict) {
        slots.push(start);
      }
    }

    return slots;
  }
}