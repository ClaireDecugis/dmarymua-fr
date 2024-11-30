import cron from "node-cron";
import User from "./backend/models/userModel.js";
import { Op } from "sequelize";
import sequelize from "./config/sequelize.js";

// Planifier une tâche pour s'exécuter quotidiennement à minuit
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily user cleanup job");

  try {
    // Supprimer les utilisateurs créés il y a plus de 6 mois, sauf les admins
    const result = await User.destroy({
      where: {
        createdAt: {
          [Op.lt]: sequelize.literal("NOW() - INTERVAL 6 MONTH"),
        },
        isAdmin: {
          [Op.not]: true, // Exclure les utilisateurs qui sont admins
        },
      },
    });

    console.log(`Deleted ${result} old users`);
  } catch (error) {
    console.error("Error during user cleanup job:", error);
  }
});

console.log("User cleanup job scheduled");
