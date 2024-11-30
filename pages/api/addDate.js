import { createAvailability } from "../../backend/services/availabilityService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { date, period } = req.body;
      console.log("Request body:", req.body);
      const newAvailability = await createAvailability({
        date,
        period,
      });
      console.log("New availability from API:", newAvailability);
      res.status(201).json(newAvailability);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
