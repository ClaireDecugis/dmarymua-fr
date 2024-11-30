import User from "../../backend/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const users = await User.findAll({
      where: {
        isAdmin: false,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting non-admin users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
