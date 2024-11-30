import Availability from "../../backend/models/availabilityModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { id_availability } = req.query;

    if (!id_availability) {
      return res.status(400).json({ error: "Missing availability ID" });
    }
    const availability = await Availability.findOne({
      where: { id_availability },
    });

    if (!availability) {
      return res.status(404).json({ error: "availability not found" });
    }
    res.status(200).json({
      id: availability.id_availability,
      date: availability.date,
      period: availability.period,
      checked: availability.checked,
      id_appointment: availability.id_appointment,
    });
  } catch (error) {
    console.error("Error getting availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
