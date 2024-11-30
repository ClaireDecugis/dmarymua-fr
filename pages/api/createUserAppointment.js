import UserAppointment from "../../backend/models/userAppointmentModel";
import User from "../../backend/models/userModel";
import Appointment from "../../backend/models/appointmentModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id_user, id_appointment } = req.body;

      if (!id_user || !id_appointment) {
        return res
          .status(400)
          .json({ error: "Missing user ID or appointment ID" });
      }

      // Vérifiez si l'utilisateur existe
      const user = await User.findOne({ where: { id_user } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const appointment = await Appointment.findOne({
        where: { id_appointment },
      });

      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      const createdUserAppointment = await UserAppointment.create({
        id_user_appointment: id_user,
        id_appointment: id_appointment,
      });

      res.status(201).json({
        message: "UserAppointment created successfully",
        userAppointment: createdUserAppointment,
      });
    } catch (error) {
      console.error("Error creating userAppointment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end();
  }
}
