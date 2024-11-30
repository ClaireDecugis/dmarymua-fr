import { NOW } from "sequelize";
import User from "../../backend/models/userModel";

const createUserHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, first_name, last_name, phone } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log("User with this email already exists:", existingUser);
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = await User.create({
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ error: "Could not create user" });
  }
};

export default createUserHandler;
