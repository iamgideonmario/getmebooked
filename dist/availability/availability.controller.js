"use strict";
check(, q);
{
    return this.availabilityService.isSlotAvailable(q.businessId, null, new Date(q.start), new Date(q.end));
}
