import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar_admin from "/component/Navbar_admin";
import styles from "../../src/app/style.module.css";

function Informations() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/updateProfile", {
        email,
        password,
        newEmail,
        newPassword,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };
  return (
    <div className={styles.container}>
      <Navbar_admin />
      <div className={styles.container_flex}>
        <div className={styles.audiovisuel_title_flex}>
          <h1>Information personnel</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <form
          className={styles.information_form}
          onSubmit={handleUpdateProfile}
        >
          <div className={styles.form_information_personal_content}>
            <div className={styles.form_information_personal_flex}>
              <div>
                <label>Email actuel</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email actuel"
                />
              </div>
              <div>
                <label>Nouvel email</label>
                <input
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Nouvel email"
                />
              </div>
              <div>
                <label>Nouveau mot de passe</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                />
              </div>
              {/* <div>
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              s
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
              <button type="submit">Mettre à jour le profil</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Informations;
