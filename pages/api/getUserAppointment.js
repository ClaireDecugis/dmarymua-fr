import UserAppointment from "../../backend/models/userAppointmentModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id_user_appointment, id_appointment } = req.query;
      console.log("req.query", req.query);

      if (!id_appointment) {
        return res.status(400).json({ error: "Missing appointment ID" });
      }

      const userAppointments = await UserAppointment.findAll({
        where: { id_appointment },
      });

      if (!userAppointments || userAppointments.length === 0) {
        return res.status(404).json({
          error: "No UserAppointments found for the appointment",
        });
      }

      const firstUserAppointment = userAppointments[0];
      const idUserAppointment = firstUserAppointment.id_user_appointment;
      console.log("idUserAppointment", idUserAppointment);
      res.status(200).json({
        message: "UserAppointments retrieved successfully",
        id_user_appointment: idUserAppointment,
        userAppointments,
      });
    } catch (error) {
      console.error("Error getting userAppointment details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end();
  }
}
