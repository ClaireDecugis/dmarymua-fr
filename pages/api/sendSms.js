import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, message } = req.body;

    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    try {
      const twilioMessage = await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
      });

      console.log("Message Twilio envoyé:", twilioMessage);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message Twilio:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'envoi du message Twilio." });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
