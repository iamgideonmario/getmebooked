"use strict";
await prisma.$transaction(async (tx) => {
    const conflict = await tx.booking.findFirst({
        where: {
            startUtc: { lt: end },
            endUtc: { gt: start }
        }
    });
    if (conflict)
        throw new Error('Unavailable');
    await tx.booking.create({ data });
});
