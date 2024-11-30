import styles from "../src/app/style.module.css";
import Navbar from "../component/Navbar";
import Image from "next/image";
import Slider_home from "../component/Slider_home";
import Footer from "../component/Footer";
import Head from "next/head";

function Accueil() {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Maquilleuse - Coiffeuse - Prothésite professionnelle"
        />
        <title>Accueil</title>
      </Head>
      <Navbar />
      <div className={styles.group_title_image_home}>
        <div className={styles.background_title_home}>
          <div className={styles.group_title_home_flex}>
            <div className={styles.group_title_home}>
              <div className={styles.title_home}>
                <h1>Mary David</h1>
                <div className={styles.home_line_title}></div>
              </div>
              <div className={styles.group_paragraph}>
                <p>Maquilleuse Coiffeuse Professionnelle - Prothésiste FX </p>
                <button>ESPACE MARIAGE</button>
              </div>
            </div>
          </div>
          <div className={styles.filter_image}></div>

          <Image
            src="/images/logo/arrow_down.svg"
            alt="arrow_down"
            width={700}
            height={400}
            style={{ width: "40px", height: "40px" }}
            priority 
          />
        </div>
      </div>
      <div>
        <div className={styles.about_home}>
          <h2 id="#">A PROPOS</h2>
          <div className={styles.about_home_flex}>
            <Image
              src="/images/photo_profile_mary.png"
              alt=""
              width={700}
              height={400}
              style={{ width: "330px", height: "280px" }}
            />
            <div className={styles.about_home_paragraph}>
              <h4>D. Mary MUA - Mary David</h4>
              <p>
                Diplômée en maquillage et effets spéciaux depuis 2018,
                j&lsquo;ai monté mon entreprise en 2019. J&lsquo;exerce en tant
                que maquilleuse - coiffeuse professionnelle en audiovisuel,
                cinéma, photographie, évènementiel et auprès des particuliers.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.redirect_faq}>
          <p>
            Vous avez des questions ? Vous pouvez regarder ma{" "}
            <a href="http://localhost:3000/faq" target="_blank">
              FAQ
            </a>
          </p>
        </div>
        <div className={styles.trust_home}>
          <h3>Ils me font confiance !</h3>
          <Slider_home />
          <p>
            Team BDS, Agicap, Théâtre de l&lsquo;Ucronie, La Fondation ARC, …
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Accueil;
