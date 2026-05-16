"use strict";
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
client.messages.create({
    from: process.env.TWILIO_PHONE,
    to: customerPhone,
    body: 'Your booking was approved ✅'
});
