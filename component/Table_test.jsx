import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import styles from "../src/app/style.module.css";
import path from "path";

function Informations() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("/api/getAllImages");
      console.log("Fetched images:", response.data);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return <ImageTable images={images} fetchImages={fetchImages} />;
}

function ImageTable({ images, fetchImages }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const imagesPerPage = 5;

  const pageCount = Math.ceil(images.length / imagesPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageIdByName = async (name) => {
    try {
      const response = await axios.get(
        `/api/getImageIdByName?imageName=${name}`
      );
      const id_image = response.data.id_image;
      console.log("Image ID:", id_image);

      await axios.delete(`/api/deleteImage?id_image=${id_image}`);

      fetchImages();
    } catch (error) {
      console.error("Error fetching image ID:", error);
    }
  };

  const displayImages = filteredImages
    .slice(pageNumber * imagesPerPage, (pageNumber + 1) * imagesPerPage)
    .map((image, index) => (
      <div className={styles.image_item} key={index}>
        <Image
          src={image.imageUrl}
          alt={image.name}
          width={200}
          height={200}
          style={{ width: "auto", height: "auto" }}
        />
        <button
          className={styles.btn_img_supp}
          onClick={() => getImageIdByName(image.name)}
        >
          Supprimer
        </button>
      </div>
    ));

  return (
    <div className={styles.image_content_flex}>
      <div className={styles.delete_image}>
        <label>Sélectionner les images à supprimer:</label>
      </div>
      <input
        className={styles.search_img_supp}
        type="text"
        placeholder="Recherche..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.image_list_component}>{displayImages}</div>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.pagination_active}
      />
    </div>
  );
}

export default Informations;
