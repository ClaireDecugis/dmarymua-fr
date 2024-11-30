import Image from "next/image";
import React, { useState } from "react";
import styles from "../src/app/style.module.css";
import axios from "axios";

const Section = () => {
  const [title, setTitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [text, setText] = useState("");

  const [imageData, setImageData] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const imageDataArray = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          imageDataArray.push({
            name: file.name,
            size: file.size,
            type: file.type,
            imageUrl: imageUrl,
          });
          if (imageDataArray.length === files.length) {
            setImageData(imageDataArray);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCreateImage = async () => {
    try {
      const imageDataStrings = imageData.map((image) => ({
        name: image.name.toString(),
        size: image.size.toString(),
        type: image.type.toString(),
        imageUrl: image.imageUrl.toString(),
      }));

      const response = await axios.post("/api/createImage", {
        imageDataArray: imageDataStrings,
      });

      console.log("Images ajoutées avec succès:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout des images:", error);
    }
  };

  const handleValidateSection = async () => {
    try {
      const response = await axios.post("/api/sections", {
        title,
        text,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("ID de la nouvelle section ajoutée:", data.sectionId);
      } else {
        console.error("Erreur lors de l'ajout de la section");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  return (
    <div>
      <h2>Section</h2>
      <div className={styles.sub_group_accueil_admin}>
        <div className={styles.accueil_admin_spacement}>
          <div className={styles.group_input}>
            <label>Titre</label>
            <input
              type="text"
              placeholder="Titre du contenu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.group_input}>
            <label>Titre du bouton</label>
            <input
              type="text"
              placeholder="Titre du button"
              value={buttonTitle}
              onChange={(e) => setButtonTitle(e.target.value)}
            />
          </div>
          <div className={styles.group_input}>
            <label> Texte </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <div className={styles.group_input}>
            <label>Ajouter des images </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div>
              <button onClick={handleCreateImage}>Valider les images</button>
            </div>
          </div>
          <div className={styles.group_input}>
            <label>Ajouter une image en arrière plan</label>
            <input type="file" accept="image/*" />
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleValidateSection}>Valider</button>
      </div>
    </div>
  );
};

export default Section;
