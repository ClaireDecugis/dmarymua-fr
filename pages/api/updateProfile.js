import bcrypt from "bcrypt";
import User from "../../backend/models/userModel";

export default async function handler(req, res) {
  const { email, newEmail, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      await User.update(
        { email: newEmail, password: hashedNewPassword },
        { where: { email } }
      );
      res.status(200).json({ message: "Profil mis à jour avec succès" });
    } else {
      res.status(401).json({ message: "Identifiants invalides" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du profil" });
  }
}
