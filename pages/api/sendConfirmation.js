export default function handler(req, res) {
  if (req.method === "POST") {
    const { date, period } = req.body;

    console.log("Date de confirmation :", date);
    console.log("Période de confirmation :", period);

    res.status(200).json({ message: "Confirmation received successfully" });
  } else {
    res.status(405).end();
  }
}
