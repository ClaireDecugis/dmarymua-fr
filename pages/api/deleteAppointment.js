// deleteAppointment.js

import Appointment from "../../backend/models/appointmentModel";
import UserAppointment from "../../backend/models/userAppointmentModel";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { id } = req.query;

    await UserAppointment.destroy({
      where: { id_appointment: id },
    });

    await Appointment.destroy({
      where: { id_appointment: id },
    });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
