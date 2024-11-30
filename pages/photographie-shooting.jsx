import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import styles from "../src/app/style.module.css";
import Head from "next/head";
import Image from "next/image";

function Shooting() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/getImageByFolder");
        setImages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des images:", error);
      }
    };

    fetchImages();
  }, []);

  const columns = [[], [], []];

  images.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <div className={styles.shooting_page}>
      <Head>
        <meta name="description" content="Shooting et maquillage artistique." />
        <title>Photographie - Shooting</title>
      </Head>
      <Navbar />
      <div>
        <div className={styles.audiovisuel_title_flex}>
          <h1> PHOTOGRAPHIE - SHOOTING </h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <div>
          <div className={styles.shooting_content}>
            <div className={styles.colonne1}>
              {columns[0].map((image, index) => (
                <div className={styles.block_shooting_image} key={index}>
                  <figure className={styles.figure}>
                    <Image
                      src={image.src}
                      alt={image.src
                        .split("/")
                        .pop()
                        .split(".")[0]
                        .replace(/_/g, " ")}
                      width={500}
                      height={600}
                      className={styles.shooting_image_unique}
                      style={{
                        objectFit: "contain",
                        height: "auto",
                      }}
                      // sizes="(max-width: 768px) 100vw, 33vw"
                      priority={true}
                    />
                    <figcaption className={styles.block_caption_shooting}>
                      {image.caption}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
            <div className={styles.colonne2}>
              {columns[1].map((image, index) => (
                <div className={styles.block_shooting_image} key={index}>
                  <figure className={styles.figure}>
                    <Image
                      src={image.src}
                      alt={image.src
                        .split("/")
                        .pop()
                        .split(".")[0]
                        .replace(/_/g, " ")}
                      width={500}
                      height={600}
                      className={styles.shooting_image_unique}
                      style={{ objectFit: "contain", height: "auto" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={true}
                    />
                    <figcaption className={styles.block_caption_shooting}>
                      {image.caption}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
            <div className={styles.colonne3}>
              {columns[2].map((image, index) => (
                <div className={styles.block_shooting_image} key={index}>
                  <figure className={styles.figure}>
                    <Image
                      src={image.src}
                      alt={image.src
                        .split("/")
                        .pop()
                        .split(".")[0]
                        .replace(/_/g, " ")}
                      width={500}
                      height={600}
                      className={styles.shooting_image_unique}
                      style={{ objectFit: "contain", height: "auto" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={true}
                    />
                    <figcaption className={styles.block_caption_shooting}>
                      {image.caption}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shooting;
