import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2026-04-22.dahlia',
});

export class PaymentService {
  async createCheckout() {
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
      success_url: 'https://getmebooked.onrender.com/success',
      cancel_url: 'https://getmebooked.onrender.com/cancel',
    });

    return session;
  }
}
``