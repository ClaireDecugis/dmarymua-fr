import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar_admin from "/component/Navbar_admin";
import styles from "../../src/app/style.module.css";

function Informations() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/checkAdmin");
        const data = response.data;
        if (response.status === 200 && data.isAdmin) {
          setLoading(false);
        } else {
          router.push("/connexion");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la requête", error);
      }
    };

    checkAdmin();
  }, [router]);
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar_admin />
      <div className={styles.container_flex}>
        <div className={styles.audiovisuel_title_flex}>
          <h1>Page - Audiovisuel - Cinéma - Publicité</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <div className={styles.accueil_admin}>
          <div className={styles.accuei_admin_flex}>
            <div>
              <div className={styles.group_accueil_admin}>
                <div className={styles.sub_group_accueil_admin}>
                  <div className={styles.group_input}>
                    <label>Titre de la page</label>
                    <input type="text" placeholder="nom du réseaux" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.group_accueil_admin}>
              <h2>Carousel</h2>
              <div className={styles.sub_group_accueil_admin}>
                <div className={styles.accueil_admin_spacement}>
                  <div className={styles.group_input}>
                    <label>Titre du carousel</label>
                    <input type="text" placeholder="Titre du contenu" />
                  </div>
                  <div className={styles.group_input}>
                    <label>Texte du contenu</label>
                    <textarea>Voici le contenu</textarea>
                  </div>
                </div>
                <div className={styles.group_input}>
                  <label>Photo du carousel</label>
                  <input type="flies" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button_footer}>
        <button>Valider</button>
      </div>
    </div>
  );
}

export default Informations;
