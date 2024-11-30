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
          <h1>Pied de page</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <div className={styles.content_footer}>
          <div className={styles.column_footer}>
            <div className={styles.column_footer_content}>
              <h2>Ajouter un réseau social</h2>
              <div className={styles.group_input}>
                <label>Nom du réseaux</label>
                <input type="text" placeholder="nom du réseaux" />
              </div>
              <div className={styles.group_input}>
                <label>Icône du réseaux</label>
                <input type="files" />
              </div>
            </div>
            <div className={styles.column_footer_content}>
              <h2>Modifier mon adresse mail</h2>
              <div className={styles.group_input}>
                <label>Nom du réseaux</label>
                <input type="email" placeholder="email" />
              </div>
            </div>
          </div>

          <div className={styles.column_footer}>
            <div className={styles.column_footer_content}>
              <h2>Supprimer un réseau social</h2>
              <div className={styles.group_input}>
                <label>Nom du réseaux</label>
                <input type="search" placeholder="nom du réseaux" />
              </div>
              <div className={styles.group_input}>
                <label>Confirmer</label>
                <div className={styles.group_input_button}>
                  <button>Oui</button>
                  <button>Non</button>
                </div>
              </div>
            </div>
            <div className={styles.column_footer_content}>
              <h2>Modifier mon numéro de téléphone</h2>
              <div className={styles.group_input}>
                <label>Téléphone</label>
                <input type="text" placeholder="numéro de téléphone" />
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
