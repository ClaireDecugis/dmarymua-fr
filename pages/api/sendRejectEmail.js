import nodemailer from "nodemailer";

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Erreur de vérification du transporteur : ", error);
  } else {
    console.log("Le transporteur est prêt à envoyer des e-mails");
  }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const userEmail = req.body.userInfo ? req.body.userInfo : null;
    console.log("User Email:", userEmail);

    if (userEmail) {
      try {
        console.log("Sending email to:", userEmail);

        await transporter.sendMail({
          from: "claire.decugis@gmail.com",
          to: userEmail,
          subject: "Votre demande de rendez-vous n'a pas pu être confirmé",
          text: "Votre rendez-vous n'a pas pu être confirmé. Si vous avez des questions , je vous laisse le soins de m'envoyer un message sur le formulaire de contact",
        });

        console.log("Email sent successfully");

        res.status(200).json({ message: "Appointment confirmed successfully" });
      } catch (error) {
        console.error("Error sending confirmation email:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.error("User email is missing or undefined");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
