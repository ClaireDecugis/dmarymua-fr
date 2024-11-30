export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id_sections } = req.body;
    try {
      const newSection = await createSection({
        id_sections,
      });
      res.status(201).json(newSection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  } else {
    res.status(405).end();
  }
}
