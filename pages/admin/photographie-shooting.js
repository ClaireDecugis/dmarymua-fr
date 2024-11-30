import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar_admin from "/component/Navbar_admin";
import styles from "../../src/app/style.module.css";
import Image from "next/image";
import Table from "../../component/Table";
import Table_test from "../../component/Table_test";
import Section from "../../component/Section";
import { v4 as uuidv4 } from "uuid";

function Informations() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  const id_sections = uuidv4();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/getAllImages");
        setImages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const imageDataArray = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result; // Obtenez l'URL de l'image
          imageDataArray.push({
            name: file.name,
            size: file.size,
            type: file.type,
            imageUrl: imageUrl, // Utilisez l'URL de l'image ici
          });
          if (imageDataArray.length === files.length) {
            setImageData(imageDataArray);
          }
        };
        reader.readAsDataURL(file); // Lecture du contenu de l'image en tant que données d'URL
      }
    }
  };

  const handleCreateImage = async () => {
    try {
      // Convertir les données des images en chaînes de caractères
      const imageDataStrings = imageData.map((image) => ({
        name: image.name.toString(),
        size: image.size.toString(),
        type: image.type.toString(),
        imageUrl: image.imageUrl.toString(),
      }));

      // Envoyer les données des images à votre API
      const response = await axios.post("/api/createImage", {
        imageDataArray: imageDataStrings,
      });

      console.log("Images ajoutées avec succès:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout des images:", error);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/checkAdmin");
        const data = response.data;
        if (response.status === 200 && data.isAdmin) {
          setLoading(false);
        } else {
          router.push("/connexion");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la requête", error);
      }
    };

    checkAdmin();
  }, [router]);
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar_admin />
      <div className={styles.container_flex}>
        <div className={styles.audiovisuel_title_flex}>
          <h1>Page - Photographie - Shooting</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <div className={styles.accueil_admin}>
          <div className={styles.accuei_admin_flex}>
            <div>
              <div className={styles.group_accueil_admin}>
                <div className={styles.sub_group_accueil_admin}>
                  <div className={styles.group_input}>
                    <label>Titre de la page</label>
                    <input type="text" placeholder="nom du réseaux" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.group_accueil_admin}>
              <h2>Thèmes</h2>
              <div className={styles.sub_group_accueil_admin}>
                <div className={styles.accueil_admin_spacement}>
                  <div className={styles.group_input}>
                    <label>Sélectionner un thème</label>
                    <input type="text" placeholder="Titre du contenu" />
                  </div>
                  <div className={styles.group_input}>
                    <label>Titre du thème</label>
                    <input type="text" placeholder="Titre du contenu" />
                  </div>
                </div>
                <div className={styles.group_input}>
                  <label>Photo du thèmes</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>TEST SEctions</h2>
              <Section sectionId={id_sections} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button_footer}>
        <button onClick={handleCreateImage}>Valider</button>
      </div>

      {/* <Table /> */}
      <Table_test />
    </div>
  );
}

export default Informations;
