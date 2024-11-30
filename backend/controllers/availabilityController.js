import {
  getAllAvailabilities,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../services/availabilityService";

// Récupérer toutes les disponibilités
const handleGetAllAvailabilities = async (req, res) => {
  try {
    const availabilities = await getAllAvailabilities();
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Créer une nouvelle disponibilité
const handleCreateAvailability = async (req, res) => {
  try {
    const newAvailability = await createAvailability(req.body);
    res.status(201).json(newAvailability);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Mettre à jour une disponibilité existante
const handleUpdateAvailability = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAvailability = await updateAvailability(id, req.body);
    res.status(200).json(updatedAvailability);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Supprimer une disponibilité
const handleDeleteAvailability = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAvailability(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  handleGetAllAvailabilities,
  handleCreateAvailability,
  handleUpdateAvailability,
  handleDeleteAvailability,
};
