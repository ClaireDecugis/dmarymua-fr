// const User = require("../../backend/models/userModel");

// const authenticateAdmin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({
//       where: { email: email, password: password },
//     });
//     if (user) {
//       console.log("connecté");
//       next();
//     } else {
//       res.status(401).json({ error: "Unauthorized access" });
//     }
//   } catch (error) {
//     console.error("Error authenticating user: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default authenticateAdmin;
