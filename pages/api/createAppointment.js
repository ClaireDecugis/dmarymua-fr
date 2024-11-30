import Appointment from "../../backend/models/appointmentModel";
import Availability from "../../backend/models/availabilityModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { description, id_availability } = req.body;

    try {
      console.log("Before creating appointment");

      const newAppointment = await Appointment.create({
        description: description,
        validated: false,
        id_availability: id_availability,
      });

      if (!newAppointment.id_appointment) {
        return res.status(500).json({ error: "Could not create appointment" });
      }

      const updateResult = await Availability.update(
        { id_appointment: newAppointment.id_appointment },
        { where: { id_availability } }
      );

      res.status(200).json(newAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ error: "Could not create appointment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
