import Availability from "../../backend/models/availabilityModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const availabilities = await Availability.findAll({
      where: {
        checked: 0,
      },
    });
    res.status(200).json({ dates: availabilities });
  } catch (error) {
    console.error("Error fetching availabilities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
