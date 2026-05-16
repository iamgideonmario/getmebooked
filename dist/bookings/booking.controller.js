"use strict";
createBooking(, body, , req);
{
    return this.bookingService.create({
        serviceId: body.serviceId,
        userId: req.user.id,
        startTime: body.startTime
    });
}
