import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar_admin from "/component/Navbar_admin";
import styles from "../../src/app/style.module.css";

function Mariage_User() {
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
          <h1>Page - Mariage</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <div className={styles.accueil_admin}>
          <div className={styles.accuei_admin_flex}>
            <div className={styles.group_accueil_admin}>
              <div className={styles.sub_group_accueil_admin}>
                <div className={styles.accueil_admin_spacement}>
                  <div className={styles.group_input}>
                    <label>Titre de la page</label>
                    <input type="text" placeholder="Titre du contenu" />
                  </div>
                  <div className={styles.group_input}>
                    <label>Texte du contenu</label>
                    <textarea>Voici le contenu</textarea>
                  </div>
                </div>
                <div className={styles.group_input}>
                  <label>Photo du haut de la page</label>
                  <input type="files" />
                </div>
              </div>
            </div>
            <div className={styles.column_footer_content}>
              <h2>Tarifs</h2>
              <div className={styles.sub_group_accueil_admin}>
                <div className={styles.accueil_admin_spacement_last}>
                  <div className={styles.group_input}>
                    <label>Titre tarifs</label>
                    <input type="text" placeholder="titre du carousel" />
                  </div>
                  <div className={styles.group_input}>
                    <label>Texte tarifs</label>
                    <textarea>Voici les tarifs...</textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.column_footer_content}>
              <h2>Collections de photos</h2>
              <div className={styles.sub_group_accueil_admin}>
                <div className={styles.accueil_admin_spacement_last}>
                  <div className={styles.group_input}>
                    <label>Photo de la collections</label>
                    <input type="files" />
                  </div>
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

export default Mariage_User;
