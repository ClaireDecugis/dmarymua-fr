import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "../src/app/style.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function Arrow(props) {
  const { style } = props;
  return <div style={{ ...style, display: "none" }} />;
}

const SimpleSlider_6 = () => {
  const [imageHeight, setImageHeight] = useState("700px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setImageHeight("300px");
      } else if (window.innerWidth <= 768) {
        setImageHeight("400px");
      } else if (window.innerWidth <= 1024) {
        setImageHeight("500px");
      } else {
        setImageHeight("700px");
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          appendDots: (dots) => <ul style={{ bottom: "35px" }}> {dots} </ul>,
        },
      },
      {
        breakpoint: 769,
        settings: {
          appendDots: (dots) => <ul style={{ bottom: "37px" }}> {dots} </ul>,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          appendDots: (dots) => <ul style={{ bottom: "35px" }}> {dots} </ul>,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div>
        <Image
          src="/images/slider/slider6_img1.jpeg"
          alt="photo tournage"
          width={900}
          height={400}
          className={styles.image_slider_cinema}
          style={{ width: "100%", height: imageHeight, objectFit: "contain" }}
        />
      </div>
      <div>
        <Image
          src="/images/slider/slider6_img2.jpeg"
          alt="photo tournage"
          width={900}
          height={400}
          className={styles.image_slider_cinema}
          style={{ width: "100%", height: imageHeight, objectFit: "contain" }}
        />
      </div>
    </Slider>
  );
};

export default SimpleSlider_6;
