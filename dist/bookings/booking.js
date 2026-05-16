"use strict";
await prisma.$transaction(async (tx) => {
    const overlap = await tx.booking.findFirst({
        where: {
            serviceId,
            startUtc: { lt: endUtc },
            endUtc: { gt: startUtc },
            status: 'APPROVED'
        }
    });
    if (overlap)
        throw new Error('Slot unavailable');
    await tx.booking.create({
        data: {
            serviceId,
            customerId,
            startUtc,
            endUtc,
            status: 'PENDING'
        }
    });
});
