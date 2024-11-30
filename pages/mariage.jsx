import Image from "next/image";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import styles from "../src/app/style.module.css";
import Widget_Testimonial from "../component/Widget_testimonial";
import Gallery_Wedding from "../component/Gallery_Mariage";
import Head from "next/head";

const images_wedding = [
  "/images/mariage/1 - Mariage shooting .png",
  "/images/mariage/2 - Mariage shooting .png",
  "/images/mariage/3 - Mariage shooting .jpg",
  "/images/mariage/4 - Mariage shooting.jpg",
  "/images/mariage/5 - Mariage shooting.jpg",
  "/images/mariage/6 - Mariage Margaux.jpg",
  "/images/mariage/7 - Mariage Margaux.jpg",
  "/images/mariage/8 - Mariage Margaux.jpg",
  "/images/mariage/9 - Mariage Margaux.png",
  "/images/mariage/A - Mariage Nelly.png",
  "/images/mariage/B - Mariage Nelly.png",
  "/images/mariage/C - Mariage Florence.jpg",
  "/images/mariage/D - Mariage Florence.jpg",
  "/images/mariage/E - Mariage Mathilde.jpg",
  "/images/mariage/F - Mariage boucles.jpg",
  "/images/mariage/G - Mariage Amandine.jpg",
  "/images/mariage/H - Mariage Elisa.jpg",
  "/images/mariage/I - Mariage shooting Vierres.jpg",
  // "/images/mariage/J - Mariage Nelly.png",
];

function Mariage() {
  return (
    <div className={styles.wedding_page}>
      <Head>
        <meta
          name="description"
          content="Maquillage et coiffure de mariage, avis des clientes , tarifs et photos."
        />
        <title>Mariage</title>
      </Head>
      <Navbar />
      <div>
        <div className={styles.audiovisuel_title_flex}>
          <h1>MARIAGE</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <div className={styles.wedding_content}>
          <div className={styles.wedding_block1}>
            <div className={styles.wedding_block1_image}>
              <Image
                src="/images/mariage/A - Mariage Nelly.png"
                alt="photo tournage"
                width={700}
                height={400}
                style={{ width: "100%", height: "100%" }}
              />
              <Image
                src="/images/mariage/MUAH-5.jpg"
                alt="photo tournage"
                width={700}
                height={400}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className={styles.wedding_block1_p}>
              <p>
                La mise en beauté de votre mariage est une étape importante pour
                un évènement réussi. Je mets tout mon savoir – faire à votre
                service pour que vous vous sentiez belle et apaisée tout au long
                de votre journée !<br></br>
                <br></br>
                Quel que soit le style pour lequel vous souhaitez opter, nous
                définirons ensemble la mise en beauté qui vous convient le mieux
                lors d’un premier rendez-vous d’essai.
                <br></br>
                <br></br>
                Le Jour J, je me déplace et m’occupe de vous avec soin selon les
                choix que nous avons fait. Vous pouvez choisir d’être seule ou
                avec vos proches, dans une ambiance sereine qui vous convient.
                C’est un moment privilégié avant la cérémonie !<br></br>
                <br></br>
                Je peux également m’occuper de vos invité.es si ils ou elles le
                désirent.
                <br></br>
                <br></br>
                N’hésitez pas à me contacter !
              </p>
            </div>
          </div>
          <div className={styles.audiovisuel_title_flex}>
            <h2 className={styles.title_wedding_price}> Tarifs 2024/2025</h2>
            <p>
              Pour en savoir plus sur mes tarifs mariage, vous pouvez
              télécharger la plaquette tarifaire{" "}
              <a
                href="https://mail.google.com/mail/u/0?ui=2&ik=31e77e03cd&attid=0.1&permmsgid=msg-f:1799654421921506730&th=18f9a8296917a5aa&view=att&disp=safe"
                download="Plaquette tarifaire mariage 2025.png"
              >
                ici
              </a>{" "}
              , ou me contacter{" "}
              <a href="http://localhost:3000/contact" target="_blank">
                ici
              </a>
            </p>
            <div className={styles.audiovisuel_line_title}></div>
          </div>
          <div className={styles.widget_testimonial}>
            <Widget_Testimonial />
            <div className={styles.audiovisuel_line_title}></div>
          </div>
          <Gallery_Wedding
            images={images_wedding}
            className={styles.block_shooting_image}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Mariage;
