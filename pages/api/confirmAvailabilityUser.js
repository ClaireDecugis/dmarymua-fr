// Importer les fonctions pour gérer la base de données
import { deleteAvailability } from "./deleteAvailability";
import { createAppointment } from "./createAppointment";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id_availability, confirmed } = req.body;

    if (confirmed) {
      createAppointment(id_availability);
      deleteAvailability(id_availability);
    } else {
      console.log("la confirmation n'a pas reussi");
    }
    res.status(200).json({ message: "Availability updated successfully" });
  } else {
    res.status(405).end();
  }
}
