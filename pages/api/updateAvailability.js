import { updateAvailability } from "../../backend/services/availabilityService";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { date, period } = req.body;
      const updatedAvailability = await updateAvailability(id, {
        date,
        period,
      });
      res.status(200).json(updatedAvailability);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
