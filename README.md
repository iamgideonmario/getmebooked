# GetMeBooked

Booking platform MVP built with NestJS, Prisma, EJS, and Stripe.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
SESSION_SECRET="your-session-secret"
APP_BASE_URL="http://localhost:3000"
STRIPE_SECRET="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

The demo seed user is:

- email: `owner@example.com`
- password: `seedpassword`

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run the app:

```bash
npm run start:dev
```

## Optional

Seed the demo data with:

```bash
npm run seed
```

Then open `http://localhost:3000`.

## Routes

- `GET /` - Home page
- `GET /business` - Business listing
- `GET /booking/new/:businessId` - Booking form
- `GET /dashboard` - User dashboard
- `GET /auth/login` - Login page
- `GET /auth/register` - Register page
- `GET /payment/success` - Payment success page
- `GET /payment/cancel` - Payment cancel page
- `POST /payment/webhook` - Stripe webhook endpoint
