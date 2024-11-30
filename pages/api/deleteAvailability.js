import Availability from "../../backend/models/availabilityModel";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      console.log("Deleting availability with id:", id);

      // Vérification de l'ID
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      // Suppression de l'availability
      const deletedCount = await Availability.destroy({
        where: { id_availability: id },
      });

      // Vérification du résultat de la suppression
      if (deletedCount === 0) {
        return res.status(404).json({ error: "Availability not found" });
      }

      res.status(200).json({ message: "Availability deleted successfully" });
    } catch (error) {
      console.error("Error deleting availability:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
