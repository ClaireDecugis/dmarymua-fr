import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "../src/app/style.module.css";

function Arrow(props) {
  const { style } = props;
  return <div style={{ ...style, display: "none" }} />;
}

const Slider_home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/487e35_de79ba1141b943f5866716bac4488b57~mv2.png"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/1200px-Olympique_lyonnais_(logo).svg.png"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/1578498831044.jpeg"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/1587832978125.jpeg"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/1633975546531.jpeg"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/compose-it-logo-corail.png"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/jumpin_pro_logo.jpeg"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/Logo-Patte-Blanche_9b087ffe-49d6-46b0-88e6-bda5456c36eb_x120@2x.webp"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/téléchargement.png"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/vfRVIQOzRR.png"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={styles.img_slider_home}>
        <Image
          src="/images/logo/logo_partenaire/wonder_chapter_logo.jpeg"
          alt="image_partenaire"
          width={700}
          height={400}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
    </Slider>
  );
};

export default Slider_home;
