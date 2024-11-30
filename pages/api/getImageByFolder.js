import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const imagesDirectory = path.join(process.cwd(), "public/images/shooting");
  const filenames = fs.readdirSync(imagesDirectory);

  const captions = {
    "1 - Maquillage beauté plage femme.png":
      "Patte Blanche Atelier – Photographe : Noémie Lacote",
    "2 - Maquillage beauté plage femme 2.png":
      "Patte Blanche Atelier – Photographe : Noémie Lacote",
    "3 - Maquillage beauté studio femme.png":
      "Patte Blanche Atelier – Photographe : Noémie Lacote",
    "4 - Maquillage beauté studio homme.png":
      "Patte Blanche Atelier – Photographe : Noémie Lacote",
    "5 - Maquillage beauté studio homme 2.png":
      "Patte Blanche Atelier – Photographe : Noémie Lacote",
    "6 - Maquillage beauté mode homme.png":
      "Dimension cachée – Photographe : Eléonore Wismes",
    "7 - Maquillage beauté mode duo.png":
      "Dimension cachée – Photographe : Eléonore Wismes",
    "8 - Maquillage beauté mode femme.png":
      "Dimension cachée – Photographe : Eléonore Wismes",
    "9 - Maquillage beauté mode femme 2.png":
      "Dimension cachée – Photographe : Eléonore Wismes",
    "A - Maquillage artistique eau femme.jpeg": "Photographe : Chris Goodin",
    "B - Maquillage artistique studio mode 2.jpeg":
      "Photographe : Nadia Khallouki",
    "C - Maquillage artistique studio mode.jpeg":
      "Photographe : Nadia Khallouki",
    "D - Maquillage théatre artistique.png":
      "Wonder Chapter – Agence Unexpected",
    "E - Maquillage cinéma film artistique femme 2.jpg": "Post-Mortem – Kim",
    "F - Maquillage cinéma film artistique femme.jpg": "Post-Mortem – Kim",
    "G - Maquillage effets spéciaux cinéma homme.jpg":
      "Photographe : Poze Productions",
    "H - Maquillage artistique femme noir et blanc.png":
      "Photographe : Adrien Maestre",
    "I - Maquillage artistique femme extérieur.jpg":
      "Photographe : Agathe Lavau",
    "J - Maquillage homme mode.png": "Photographe : Nadia Khallouki",
    "K - Maquillage mariage beauté.jpg":
      "Li et Créations – Photographe : Sarah Mangeret",
    "L - Maquillage mariage beauté 2.jpg":
      "Li et Créations – Photographe : Sarah Mangeret",
    "M - Maquillage mode studio duo.png":
      "Patte Blanche Atelier – Photographe : Sharleen Povsl",
    "N - Maquillage mode studio femme.png":
      "Patte Blanche Atelier – Photographe : Sharleen Povsl",
    "O - Maquillage studio mode homme.png":
      "Patte Blanche Atelier – Photographe : Sharleen Povsl",
    "P - Maquillage mode studio femme 2.png":
      "Patte Blanche Atelier – Photographe : Sharleen Povsl",
    "Q - Maquillage artistique femme halloween.png": "Photographe : Mary David",
    "R - Maquillage homme mode rose.jpeg": "Photographe : Nadia Khallouki",
    "S - Maquillage 90s duo femmes.jpg": "Photographe : Agathe Lavau",
    "T - Maquillage UV duo.jpeg": "Photographe : Agathe Lavau",
    "U - Maquillage femme sophistiqué.png": "Photographe : Mary David",
    // Ajoutez des légendes pour toutes vos images
  };

  const images = filenames.map((name) => ({
    src: `/images/shooting/${name}`,
    caption: captions[name] || "Shooting",
  }));

  res.status(200).json(images);
}
