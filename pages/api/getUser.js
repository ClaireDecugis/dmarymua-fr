import User from "../../backend/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { id_user } = req.query;
    console.log("Received user ID:", id_user);
    if (!id_user) {
      return res.status(400).json({ error: "Missing user ID" });
    }
    console.log(`Fetching user details for id_user: ${id_user}`);
    const user = await User.findOne({ where: { id_user } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      id: user.id_user,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
