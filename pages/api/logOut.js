// api/logout.js
export default function handler(req, res) {
  res.setHeader("Set-Cookie", "loggedIn=invalid; Max-Age=0; Path=/"); // Mettre à jour le cookie pour le rendre invalide
  res.status(200).json({ message: "Déconnexion réussie" });
}
