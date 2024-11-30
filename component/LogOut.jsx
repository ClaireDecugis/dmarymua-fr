// Composant de déconnexion
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/logOut");
      router.push("/connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default Logout;
