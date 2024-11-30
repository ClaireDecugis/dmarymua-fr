import Image from "../../backend/models/imageModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { id_image } = req.query;
    console.log("req.query id_image", req.query);
    const image = await Image.findOne({ where: { id_image } });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    res.status(500).json({ error: "Error fetching image by ID" });
  }
}
