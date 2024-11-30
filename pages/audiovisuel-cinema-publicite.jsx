import Head from "next/head";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import SimpleSlider from "../component/Slider_1";
import SimpleSlider_2 from "../component/Slider_2";
import SimpleSlider_3 from "../component/Slider_3";
import SimpleSlider_4 from "../component/Slider_4";
import SimpleSlider_5 from "../component/Slider_5";
import SimpleSlider_6 from "../component/Slider_6";
import SimpleSlider_7 from "../component/Slider_7";
import styles from "../src/app/style.module.css";
import SimpleSlider0 from "../component/Slider_0";

function Audiovisuel() {
  return (
    <div className={styles.audiovisuel_page}>
      <Head>
        <meta
          name="description"
          content="AUDIOVISUEL - CINÉMA - PUBLICITÉ - photos de tournage"
        />
        <title>Audiovisuel-Cinema-Publicite</title>
      </Head>
      <Navbar />
      <div className={styles.audiovisuel_title_flex}>
        <h1>AUDIOVISUEL - CINÉMA - PUBLICITÉ </h1>
        <div className={styles.audiovisuel_line_title}></div>
      </div>

      <div className={styles.audiovisuel_flex}>
        <SimpleSlider0 />
        <h2>
          Photos de tournage &quot; Second Souffle &quot; réalisé par Faustine
          Masingarbe, produit par Compose It Prod <br></br>
          Crédits photos : Tony Noël et Arthur Gauthier
        </h2>
        <SimpleSlider />
        <h2>
          Photos de tournage &quot; Le tournesol &quot; réalisé par Arnaud
          Mizzon et Anais Aidoud <br></br>
          Crédits photo : Sarah Mangeret
        </h2>
        <SimpleSlider_2 />
        <h2>
          Photos de tournage spot publicitaire TV Cicatryl <br></br> Crédits
          photo : Sarah Mangeret
        </h2>
        <SimpleSlider_3 />
        <h2>
          Photos de tournage spot publicitaire &quot;La Légende&quot; de
          Révillon, réalisé par Arnaud Mizzon <br></br> Crédits photo : Sarah
          Mangeret
        </h2>
        <SimpleSlider_4 />
        <h2>
          Photos de tournage Nikon film &quot;Bulle&quot; réalisé par Nicolas
          Ferron <br></br> Crédits photo : Ianis Mangin
        </h2>
        <SimpleSlider_5 />
        <h2>
          Photos de tournage du clip &quot;Qu&lsquo;est ce qui nous rend
          fous&quot; d&lsquo;Alliel, réalisé par Arnaud Mizzon <br></br> Crédits
          photo : Sarah Mangeret
        </h2>
        <SimpleSlider_6 />
        <h2>
          Images extraites du teaser e-sport BDS x Valorant réalisé par Martin
          Advocat-Courageaud
        </h2>
        <SimpleSlider_7 />
        <h2>
          mages extraites du court-métrage &quot;Annie&quot;, réalisé par
          Alexandra Lauga
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default Audiovisuel;
