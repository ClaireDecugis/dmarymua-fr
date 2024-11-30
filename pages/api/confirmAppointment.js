import Appointment from "../../backend/models/appointmentModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { id } = req.query;
    console.log("req.query", req.query);
    if (!id) {
      return res.status(400).json({ error: "Missing appointment ID" });
    }
    await Appointment.update(
      { validated: true },
      { where: { id_appointment: id } }
    );
    res.status(200).json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
