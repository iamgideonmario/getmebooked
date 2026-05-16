"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsApp = sendWhatsApp;
const twilio_1 = require("./twilio");
async function sendWhatsApp(to, message) {
    return twilio_1.twilioClient.messages.create({
        from: 'whatsapp:+14155238886', // Twilio sandbox number
        to: `whatsapp:${to}`,
        body: message
    });
}
