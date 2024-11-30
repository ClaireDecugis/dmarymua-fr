import styles from "../src/app/style.module.css";
import Image from "next/image";

const Gallery_Wedding = ({ images }) => {
  const columns = [[], [], []];
  images.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <div className={styles.gallery_wedding_container}>
      <div className={styles.colonne1}>
        {columns[0].map((image, index) => (
          <div className={styles.imageWrapper} key={index}>
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className={styles.gallery_image}
              width={500}
              height={500}
              style={{ height: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
      <div className={styles.colonne2}>
        {columns[1].map((image, index) => (
          <div className={styles.imageWrapper} key={index}>
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className={styles.gallery_image}
              width={500}
              height={500}
              style={{ height: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
      <div className={styles.colonne3}>
        {columns[2].map((image, index) => (
          <div className={styles.imageWrapper} key={index}>
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className={styles.gallery_image}
              width={500}
              height={500}
              style={{ height: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery_Wedding;
