import { getAllAvailabilities } from "../../backend/services/availabilityService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const existingDates = await getAllAvailabilities();
      res.status(200).json({ dates: existingDates });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
