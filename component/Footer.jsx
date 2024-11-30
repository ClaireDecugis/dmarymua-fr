import Link from "next/link";
import styles from "../src/app/style.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h3>Me retrouver sur les réseaux</h3>
        <div className={styles.logo_footer}>
          <Link href="https://www.instagram.com/dmarymua/" className="">
            <Image
              src="images\logo\instagram.svg"
              alt="Logo Instagram"
              width={35}
              height={35}
            />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100011327557973"
            className=""
          >
            <Image
              src="images\logo\facebook.svg"
              alt="Logo Instagram"
              width={35}
              height={35}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/david-mary-aabb91115/#experience"
            className=""
          >
            <Image
              src="images\logo\linkedin.svg"
              alt="Logo Instagram"
              width={35}
              height={35}
            />
          </Link>
        </div>
      </div>
      <div className={styles.block_footer}>
        <h3>Contact</h3>
        <div className={styles.list_footer}>
          <p>Mail : mary.david85@wanadoo.fr</p>
          <p>Téléphone : 07.77.36.16.67</p>
        </div>
      </div>
      <div className={styles.block_footer}>
        <h3>Navigation</h3>
        <div className={styles.list_footer}>
          <p>
            <Link href="/" className={styles.nav_link}>
              Accueil
            </Link>
          </p>

          <p>
            {" "}
            <Link
              href="/audiovisuel-cinema-publicite"
              className={styles.nav_link}
            >
              Audiovisuel - cinéma - publicité
            </Link>
          </p>

          <p>
            <Link href="/photographie-shooting" className={styles.nav_link}>
              Photographie - shooting
            </Link>
          </p>

          <p>
            <Link href="/mariage" className={styles.nav_link}>
              Mariage
            </Link>
          </p>

          <p>
            <Link href="/tarifs" className={styles.nav_link}>
              Tarifs
            </Link>
          </p>

          <p>
            <Link href="/contact" className={styles.nav_link}>
              Contact - Rdv
            </Link>
          </p>

          <p>
            <Link href="/faq" className={styles.nav_link}>
              Faq
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
