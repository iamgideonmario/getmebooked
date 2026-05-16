"use strict";
handle(, req);
{
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
        const businessId = event.data.object.metadata.businessId;
        await prisma.business.update({
            where: { id: businessId },
            data: { plan: 'PRO' }
        });
    }
}
