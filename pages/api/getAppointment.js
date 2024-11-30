import Appointment from "../../backend/models/appointmentModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const appointments = await Appointment.findAll();

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: "No appointments found" });
    }

    const formattedAppointments = appointments.map((appointment) => ({
      id: appointment.id_appointment,
      description: appointment.description,
      validated: appointment.validated,
      id_availability: appointment.id_availability,
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
