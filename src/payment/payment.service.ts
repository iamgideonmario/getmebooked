import Stripe from 'stripe';

function getStripeClient() {
  const stripeKey = process.env.STRIPE_SECRET;

  if (!stripeKey) {
    throw new Error('Missing STRIPE_SECRET environment variable');
  }

  return new Stripe(stripeKey, {
    apiVersion: '2026-04-22.dahlia',
  });
}

const stripe = getStripeClient();

export class PaymentService {
  async createCheckout(bookingId: string) {
    const base = process.env.APP_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Booking Fee',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${base}/payment/success?bookingId=${bookingId}`,
      cancel_url: `${base}/payment/cancel?bookingId=${bookingId}`,
      metadata: {
        bookingId,
      },
    });

    return session;
  }

  constructWebhookEvent(payload: string, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
    }

    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }
}
``