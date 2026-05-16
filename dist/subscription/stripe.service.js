"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckout = createCheckout;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
async function createCheckout(businessId) {
    return stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: process.env.STRIPE_PRO_PRICE, quantity: 1 }],
        success_url: '/dashboard',
        cancel_url: '/billing',
        metadata: { businessId }
    });
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});
