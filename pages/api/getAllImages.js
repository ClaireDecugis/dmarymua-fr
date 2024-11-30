import { getAllImages } from "../../backend/services/imageService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const images = await getAllImages();

      res.status(200).json(images);
    } catch (error) {
      console.error("Erreur lors de la récupération des images:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des images" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
