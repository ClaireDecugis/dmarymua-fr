import Image from "next/image";
import React from "react";
import styles from "../src/app/style.module.css";

const Block_Tarifs = ({ data }) => {
  return (
    <div className={styles.block_tarifs}>
      <div className={styles.block_tarifs_image}>
        <Image
          src={data.image_url}
          alt={data.title}
          className="gallery_image"
          width={500}
          height={500}
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>
      <div className={styles.block_tarifs_data}>
        <h2>{data.title}</h2>
        <p>
          <ul>
            {data.description.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Block_Tarifs;
