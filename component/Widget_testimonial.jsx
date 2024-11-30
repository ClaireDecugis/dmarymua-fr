import Image from "next/image";
import React, { useEffect } from "react";
import styles from "../src/app/style.module.css";

const Widget_Testimonial = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn1.mariages.net/js/wp-widget.js?symfnw-FR48-1-20240521-006_www_m_";
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      wpShowReviews(269321, "black");
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="wp-widget-reviews" className={styles.widget_testimonial}>
      <div id="wp-widget-preview" className={styles.widget_testimonial}>
        Lire{" "}
        <a
          href="https://www.mariages.net/esthetique-coiffure-mariage/dmarymua--e269321/avis"
          rel="nofollow"
        >
          nos avis
        </a>{" "}
        à&nbsp;
        <a href="https://www.mariages.net" rel="nofollow">
          <Image
            src="https://cdn1.mariages.net/assets/img/logos/gen_logoHeader.svg"
            height={70}
            width={70}
            alt="Logo"
          />
        </a>
      </div>
    </div>
  );
};
export default Widget_Testimonial;
