import Availability from "../models/availabilityModel";

const getAllAvailabilities = async () => {
  try {
    const availabilities = await Availability.findAll({
      where: {
        period: ["am", "pm", "day"],
      },
    });
    return availabilities;
  } catch (error) {
    throw new Error("Error fetching availabilities from the database");
  }
};

const createAvailability = async (data) => {
  try {
    console.log("Data received for creating availability: ", data);
    const newAvailability = await Availability.create(data);
    console.log("New availability created: ", newAvailability);
    return newAvailability;
  } catch (error) {
    console.error("Error creating availability in the database: ", error);
    throw new Error("Error creating availability in the database");
  }
};

const updateAvailability = async (id, data) => {
  try {
    console.log("ID received for updating availability: ", id);
    console.log("Data received for updating availability: ", data);
    await Availability.update(data, {
      where: { id_availability: id },
    });
    const updatedAvailability = await Availability.findByPk(id);
    console.log("Availability updated successfully: ", updatedAvailability);
    return updatedAvailability;
  } catch (error) {
    console.error("Error updating availability in the database: ", error);
    throw new Error("Error updating availability in the database");
  }
};

const deleteAvailability = async (id) => {
  try {
    console.log("Attempting to delete availability with ID:", id);

    // Suppression de l'entrée dans la base de données
    const result = await Availability.destroy({
      where: { id_availability: id },
    });

    console.log(`Number of rows deleted: ${result}`);

    return result; // Retourne le nombre d'entrées supprimées
  } catch (error) {
    console.error("Error deleting availability from the database:", error);
    throw new Error("Error deleting availability from the database");
  }
};

export {
  getAllAvailabilities,
  createAvailability,
  updateAvailability,
  deleteAvailability,
};
