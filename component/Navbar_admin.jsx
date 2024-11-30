import Link from "next/link";
import { useState } from "react";
import styles from "../src/app/style.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Logout from "./LogOut";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Logout />
        </li>
        <li>
          <Link href="/admin/information">Information personnel</Link>
        </li>
        <li>
          <Link href="/admin/barre-de-navigation">Barre de navigation</Link>
        </li>
        <li>
          <Link href="/admin/pied-de-page">Pied de page</Link>
        </li>
        <li>
          <a href="#" onClick={toggleMenu}>
            Pages
          </a>
          {menuVisible && (
            <ul className={styles.sidebar_dropdown}>
              <li>
                <Link href="/admin/accueil">accueil</Link>
              </li>
              <li>
                <Link href="/admin/audiovisuel-cinema-publicite">
                  Audiovisuel-Cinéma-Publicité
                </Link>
              </li>
              <li>
                <Link href="/admin/photographie-shooting">
                  Photographie-Shooting
                </Link>
              </li>
              <li>
                <Link href="/admin/mariage">Mariage</Link>
              </li>
              <li>
                <Link href="/admin/tarifs">Tarifs</Link>
              </li>
              <li>
                <Link href="/admin/contact">Contact</Link>
              </li>
              <li>
                <Link href="/admin/faq">FAQ</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
