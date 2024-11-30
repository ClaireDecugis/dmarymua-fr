import { useState } from "react";
import styles from "../src/app/style.module.css";
import Image from "next/image";

const Gallery_Shooting = ({ images }) => {
  return (
    <div className={styles.block_shooting_image}>
      {images.map((imageUrl, index) => (
        <Image
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          className="gallery_image"
          width={300}
          height={300}
          style={{ width: "auto", height: "100%", objectFit: "contain" }}
        />
      ))}
    </div>
  );
};

export default Gallery_Shooting;
