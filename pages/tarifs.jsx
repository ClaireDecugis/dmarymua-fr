import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import styles from "../src/app/style.module.css";
import Block_Tarifs from "../component/Block_Tarifs";
import Link from "next/link";
import Head from "next/head";

const rate_data = [
  {
    title: "Mise en beauté",
    image_url: "/images/mariage/5 - Mariage shooting.jpg",
    description: [
      "Mise en beauté narutelle - 50€",
      "Maquillage de soirée - 65€",
    ],
  },
  {
    title: "Artistique",
    image_url: "/images/shooting/A - Maquillage artistique eau femme.jpeg",
    description: [
      "Maquillage artistique simple - Sur devis - à partir de 60€",
      "Maquillage artistique avec effets spéciaux - Sur devis - à partir de 90€",
    ],
  },
  {
    title: "Cours",
    image_url: "/images/cours_maquillage.jpg",
    description: [
      "Cours 1 personne maquillage naturel - 1h30 - 70€",
      "Cours collectif maquillage naturel - 55€/personne",
      "Cours 1 personne maquillage soirée - 1h30 - 85€",
      "Cours collectif maquillage soirée - 70€/personne",
      "Cours 1 personne maquillage artistique - 3h00 - Sur devis - à partir de 90€",
      "Cours collectif maquillage artistique - Sur devis à partir de 75€/personne",
    ],
  },
];

function Tarifs() {
  return (
    <div className={styles.tarifs_page}>
      <Head>
        <meta name="description" content="Tarifs sur mes préstations." />
        <title>Tarifs</title>
      </Head>
      <Navbar />
      <div className={styles.audiovisuel_title_flex}>
        <h1>TARIFS</h1>
        <div className={styles.audiovisuel_line_title}></div>
      </div>
      <div className={styles.group_block_tarifs}>
        <div className={styles.group_button_tarifs}>
          <p>Pour les marié.e.s, c&lsquo;est par ici </p>
          <Link href="/mariage" className={styles.button_tarifs}>
            Tarifs Mariage
          </Link>
        </div>

        {rate_data.map((data, index) => (
          <Block_Tarifs key={index} data={data} />
        ))}

        <div className={styles.tarifs_professionals}>
          <h2>Professionnels:</h2>
          <p>
            Pour toute prestation audiovisuel / shooting / théâtre / évènement
            ou autres, contactez moi pour obtenir un devis !
          </p>
          <p>Les tarifs indiqués sont hors frais de déplacement.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tarifs;
