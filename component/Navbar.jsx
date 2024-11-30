import Link from "next/link";
import { useState } from "react";
import styles from "../src/app/style.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const router = useRouter();
  const is_wedding_page = router.pathname === "/mariage";
  const nav_style_page = is_wedding_page
    ? styles.nav_wedding_page
    : styles.nav_block;

  const src_logo = is_wedding_page
    ? "images/logo/logo noir svp dmarymua.svg"
    : "images/logo/logo_blanc.svg";

  const showMenu = () => {
    setMenuVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <nav className={`${nav_style_page}`}>
      <div className="">
        <Link href="/accueil">
          <Image
            src={`${src_logo}`}
            alt="Logo Dmarymua"
            width={80}
            height={80}
          />
        </Link>
      </div>
      <div
        className={
          menuVisible
            ? `${styles.menu_burger} ${styles.menu_visible}`
            : styles.menu_burger
        }
        onClick={toggleMenu}
      >
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
      </div>
      <ul
        className={`${styles.nav_flex} ${menuVisible ? styles.nav_active : ""}`}
      >
        <li>
          <Link href="/accueil" className={styles.nav_link}>
            Accueil
          </Link>
        </li>
        <li
          onMouseEnter={showMenu}
          onMouseLeave={hideMenu}
          onMouseOver={toggleHover}
        >
          <a className={styles.nav_link} href="#" onClick={toggleMenu}>
            Portfolio
          </a>
          {(menuVisible || isHovered) && (
            <ul
              className={`${styles.dropdown} ${
                menuVisible || isHovered ? styles.visible : ""
              }`}
            >
              <li>
                <Link
                  href="/audiovisuel-cinema-publicite"
                  className={styles.nav_link}
                >
                  Audiovisuel-cinéma-publicité
                </Link>
              </li>
              <li>
                <Link href="/photographie-shooting" className={styles.nav_link}>
                  Photographie - shooting
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/mariage" className={styles.nav_link}>
            Mariage
          </Link>
        </li>
        <li>
          <Link href="/tarifs" className={styles.nav_link}>
            Tarifs
          </Link>
        </li>
        <li>
          <Link href="/contact" className={styles.nav_link}>
            Contact - Rendez-vous
          </Link>
        </li>
      </ul>
    </nav>
  );
}
