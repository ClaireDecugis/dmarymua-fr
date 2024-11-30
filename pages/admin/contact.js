import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar_admin from "../../component/Navbar_admin";
import styles from "../../src/app/style.module.css";
import ConfirmedAppointment from "../../component/Confirmed_Appointment";

const Contact = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [getAllAvailabilities, setGetAllAvailabilities] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    period: "",
  });
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

  useEffect(() => {
    const fetchGetAllAvailabilities = async () => {
      try {
        const response = await axios.get("/api/getAllAvailabilitiesUnchecked");
        setGetAllAvailabilities(response.data.dates);
      } catch (error) {
        console.error("Error fetching existing dates:", error);
      }
    };

    fetchGetAllAvailabilities();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDate = async () => {
    let periodToSave;

    if (formData.period === "day") {
      periodToSave = "day";
    } else {
      periodToSave = formData.period;
    }

    try {
      console.log("Data to be sent to API:", {
        date: formData.date,
        period: periodToSave,
      });
      const response = await axios.post("/api/addDate", {
        date: formData.date,
        period: periodToSave,
      });
      console.log("Date ajoutée avec succès:", response.data);
      setFormData({ date: "", period: "" });
      fetchGetAllAvailabilities();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la date:", error);
    }
  };

  // const handleUpdateDate = async () => {
  //   try {
  //     const response = await axios.put(
  //       `/api/updateAvailability?id=${selectedDate}`,
  //       {
  //         date: formData.date,
  //         period: formData.period,
  //       }
  //     );
  //     console.log("Date updated successfully:", response.data);
  //     fetchGetAllAvailabilities();
  //   } catch (error) {
  //     console.error("Error updating date:", error);
  //   }
  // };

  const handleDeleteDate = async () => {
    try {
      const availabilityToDelete = getAllAvailabilities.find(
        (availability) => availability.id_availability
      );

      if (!availabilityToDelete) {
        console.error("Availability not found for deletion");
        return;
      }

      console.log("Attempting to delete date with ID:", selectedDate);
      const response = await axios.delete(
        `/api/deleteAvailability?id=${availabilityToDelete.id_availability}`
      );
      console.log("Date deleted successfully:", response.data);
      fetchGetAllAvailabilities();
    } catch (error) {
      console.error("Error deleting date:", error);
    }
  };

  return (
    <div className={styles.container_page_admin}>
      <Navbar_admin />
      <div className={styles.container_flex}>
        <div className={styles.audiovisuel_title_flex}>
          <h1>Page - Contact - Rendez-vous</h1>
          <div className={styles.audiovisuel_line_title}></div>
        </div>
        <form className={styles.form_calendar_admin}>
          <div className={styles.group_button_calendar_admin}>
            <div className={styles.group_input_calendar_admin}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Entrez une date au format mm/jj/aaaa"
              />
            </div>

            <div className={styles.group_input_calendar_admin}>
              <label>Période:</label>
              <select
                name="period"
                value={formData.period}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez une période</option>
                <option value="am">Matin</option>
                <option value="pm">Après-midi</option>
                <option value="day">Journée</option>
              </select>
            </div>

            <button
              className={styles.button_add_availability}
              type="button"
              onClick={handleAddDate}
            >
              Ajouter Disponibilité
            </button>
          </div>

          <div className={styles.group_button_calendar_admin}>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {getAllAvailabilities && getAllAvailabilities.length > 0 ? (
                getAllAvailabilities.map((availability, index) => (
                  <option key={index} value={availability.id_availability}>
                    {availability.date}
                  </option>
                ))
              ) : (
                <option value="">Aucune date disponible</option>
              )}
            </select>
            {/* <button
              className={styles.button_update_availability}
              type="button"
              onClick={handleUpdateDate}
            >
              Modifier Disponibilité
            </button> */}

            <button
              className={styles.button_delete_availability}
              type="button"
              onClick={handleDeleteDate}
            >
              Supprimer Disponibilité
            </button>
          </div>
        </form>

        <ConfirmedAppointment />
      </div>
    </div>
  );
};

export default Contact;
