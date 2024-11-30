// pages/api/login.js
import { serialize } from "cookie";
import User from "../../backend/models/userModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      attributes: ["id_user", "email", "password"],
      where: { email: email },
    });
    if (user && bcrypt.compare(password, user.password)) {
      res.setHeader(
        "Set-Cookie",
        serialize("loggedIn", "true", {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "development",
        })
      );
      res.status(200).json({ message: "Connexion réussie" });
    } else {
      res.status(401).json({ message: "Identifiants invalides" });
    }
  } catch (error) {
    console.error("Erreur d'authentification : ", error);
    setError("Une erreur s'est produite. Veuillez réessayer ultérieurement.");
  }
}
