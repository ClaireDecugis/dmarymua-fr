import Head from "next/head";
import Faq from "../component/Faq";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import styles from "../src/app/style.module.css";

function Contact() {
  const faqData = [
    {
      question: "Comment puis-je réserver une prestation ?",
      answer: `
        <ul>
          <li>Vous pouvez me contacter via le <a href="http://localhost:3000/contact" target="_blank">formulaire de contact du site</a></li>
          <li>Effectuer une demande de rdv téléphonique via le <a href="http://localhost:3000/contact" target="_blank">calendrier de réservation</a></li>
          <li>Me contacter par message privé sur <a href="https://www.instagram.com/dmarymua/?hl=fr" target="_blank">Instagram</a></li>
          <li>M’envoyer une demande de réservation par mail : mary.david85@wanadoo.fr</li>
        </ul>`,
    },
    {
      question: "Où exercez-vous ?",
      answer: `
        <p><span>Particuliers et mariages :</span> Je me déplace sur l’intégralité de la région Auvergne – Rhône – Alpes</p>
        <p><span>Professionnels :</span> Je me déplace sur la France entière et à l’étranger</p>
        <p>Des frais de déplacements et/ou l’hébergement peuvent être à prévoir selon la demande.</p>`,
    },
    {
      question: "Quels produits utilisez-vous ?",
      answer: `
        <p>Voici les marques avec lesquelles je travaille le plus fréquemment :</p>
        <ul>
          <li>MAC</li>
          <li>Makeup For Ever</li>
          <li>Typology</li>
          <li>Embryolisse</li>
          <li>Erborian</li>
          <li>Osis</li>
          <li>Kryolan</li>
        </ul>
        <p>Pour les enfants de moins de 12 ans : je n’utilise que des soins et des matières très fines (poudres libres, fards à l’eau, fards secs).</p>`,
    },
    {
      question: "Quels sont les tarifs et que représentent-ils ?",
      answer: `
        <p><span>Particuliers :</span> Les tarifs des différentes prestations sont disponibles <a href="http://localhost:3000/tarifs" target="_blank">ici</a>.</p>
        <p><span>Mariages et professionnels :</span> Pour connaitre les tarifs des prestations, vous pouvez prendre contact avec moi afin d’établir un devis ou télécharger la plaquette <a href="https://mail.google.com/mail/u/0?ui=2&ik=31e77e03cd&attid=0.1&permmsgid=msg-f:1799654421921506730&th=18f9a8296917a5aa&view=att&disp=safe" download="Plaquette tarifaire mariage 2025.png">tarifaire de mariage</a>.</p>
        <p>Les tarifs sont déterminés par différents critères :</p>
        <ul>
          <li>le temps nécessaire à la réalisation de la prestation</li>
          <li>la qualité et le prix des produits utilisés</li>
          <li>les frais de déplacement et d’hébergement si nécessaire</li>
          <li>mon savoir-faire</li>
        </ul>`,
    },
  ];

  return (
    <div className={styles.tarifs_page}>
      <Head>
        <meta
          name="description"
          content="Faq - toutes les questions que vous vous posez, ainsi que leurs réponses."
        />
        <title>Faq</title>
      </Head>
      <Navbar />
      <div className={styles.audiovisuel_title_flex}>
        <h1>FAQ</h1>
        <div className={styles.audiovisuel_line_title}></div>
      </div>
      <div className={styles.group_faq_flex}>
        <Faq faqData={faqData} />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
