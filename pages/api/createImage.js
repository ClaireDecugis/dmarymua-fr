import fs from "fs";
import path from "path";
import axios from "axios";
import { createImage } from "../../backend/services/imageService";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { imageDataArray } = req.body;

      for (const imageDataItem of imageDataArray) {
        const { name, size, type, imageUrl } = imageDataItem;

        await createImage({
          name: name,
          weight: size,
          type: type,
          description: "",
          imageUrl: imageUrl,
        });

        const imagePath = path.join(
          process.cwd(),
          "public",
          "images",
          "shooting",
          name
        );
        const imageStream = fs.createWriteStream(imagePath);
        const response = await axios.get(imageUrl, { responseType: "stream" });
        response.data.pipe(imageStream);
        await new Promise((resolve, reject) => {
          imageStream.on("finish", resolve);
          imageStream.on("error", reject);
        });
      }

      res.status(201).json({ message: "Images ajoutées avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'ajout des images:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
