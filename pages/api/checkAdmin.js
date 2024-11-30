import User from "../../backend/models/userModel";

export default async function handler(req, res) {
  const loggedIn = req.cookies.loggedIn || req.headers.cookie;

  if (loggedIn === "true") {
    const user = await User.findOne({
      where: { isAdmin: true },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (user) {
      res.status(200).json({ isAdmin: true });
    } else {
      res.status(403).json({ message: "Accès refusé." });
    }
  } else {
    res.status(401).json({ isAdmin: false });
  }
}
