import SectionImage from "../../backend/models/sectionImagesModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const sectionImages = await SectionImage.findAll();

      if (!sectionImages || sectionImages.length === 0) {
        return res.status(404).json({ error: "Section images not found" });
      }

      res.status(200).json(sectionImages);
    } catch (error) {
      console.error("Error fetching section images:", error);
      res.status(500).json({ error: "Error fetching section images" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
