import { twilioClient } from './twilio';

export async function sendWhatsApp(to: string, message: string) {
  return twilioClient.messages.create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: `whatsapp:${to}`,
    body: message
  });
}