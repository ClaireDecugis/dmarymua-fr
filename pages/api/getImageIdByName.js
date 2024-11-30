// import Image from "../../backend/services/imageService";
import Image from "../../backend/models/imageModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { imageName } = req.query;
      console.log("req.query name", req.query);
      const image = await Image.findOne({ where: { name: imageName } });

      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      res.status(200).json({ id_image: image.id_image });
    } catch (error) {
      console.error("Error fetching image name:", error);
      res.status(500).json({ error: "Error fetching image ID" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
