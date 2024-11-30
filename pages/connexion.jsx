import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "cookie";
import styles from "../src/app/style.module.css";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.status === 200) {
        document.cookie = cookie.serialize("loggedIn", "true", {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "development",
        });
        setIsLoggedIn(true);
        alert(response.data.message);
        router.push("/admin/accueil");
      } else {
        setError("Erreur lors de la connexion. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur d'authentification : ", error);
      setError("Une erreur s'est produite. Veuillez réessayer ultérieurement.");
    }
  };

  if (isLoggedIn) {
    return <div>Vous êtes connecté en tant qu&lsquo;administrateur.</div>;
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_flex}>
        <div className={styles.login_content}>
          <h2>{isLogin ? "Connexion Admin" : "Inscription Admin"}</h2>
          <form>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoComplete="current-password"
            />
            <button onClick={handleAuth}>
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>
          {/* <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Créer un compte" : "Vous avez déjà un compte ?"}
          </p> */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
