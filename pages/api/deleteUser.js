import User from "../../backend/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { id_user_appointment } = req.query;
    console.log("Deleting user with id:", id_user_appointment);
    await User.destroy({
      where: { id_user: id_user_appointment },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
