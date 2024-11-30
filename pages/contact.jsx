import React, { useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import styles from "../src/app/style.module.css";
import Form from "../component/Form";
import Calendar from "../component/MyCalendar";
import { AvailabilityProvider } from "../contexts/AvailabilityContext";
import Head from "next/head";

function Contact() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showRdvForm, setShowRdvForm] = useState(false);

  const handleSlotSelect = (slotInfo) => {
    console.log("Slot Info in Contact component:", slotInfo);
    setSelectedSlot(slotInfo);
    setShowRdvForm(true);
  };

  const handleContactButtonClick = () => {
    setShowContactForm(true);
    setShowRdvForm(false);
  };

  const handleRdvButtonClick = () => {
    setShowRdvForm(true);
    setShowContactForm(false);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    if (selectedSlot) {
      console.log("Data to be sent:", { ...data, slot: selectedSlot });
    } else {
      console.log("Data to be sent:", data);
    }
  };

  return (
    <div className={styles.tarifs_page}>
      <Head>
        <meta
          name="description"
          content="Prise de rendez-vous, formulaire de contact pour me poser des questions"
        />
        <title>Contact - Rendez-vous</title>
      </Head>
      <Navbar />
      <div className={styles.audiovisuel_title_flex}>
        <h1>CONTACT - RENDEZ-VOUS</h1>
        <div className={styles.audiovisuel_line_title}></div>
      </div>
      <div className={styles.contact_contain}>
        <div className={styles.button_group}>
          <div
            className={`${styles.button_group_flex} ${
              showRdvForm ? styles.hide : ""
            }`}
          >
            <p>
              Si vous souhaitez demander un devis ou poser des questions cliquez
              ci-dessous.
            </p>
            <button onClick={handleContactButtonClick}>
              Formulaire de Contact
            </button>
          </div>
          <div
            className={`${styles.button_group_flex} ${
              showContactForm ? styles.hide : ""
            }`}
          >
            <p>
              Si vous souhaitez prendre un rendez-vous téléphonique, veuillez
              cliquez ci-dessous, je recevrais un sms avec vos coordonnées
            </p>
            <button onClick={handleRdvButtonClick}>
              Formulaire de Rendez-vous
            </button>
          </div>
        </div>
        {showContactForm && (
          <div className={styles.contact_content}>
            <Form isRdv={false} onFormSubmit={handleFormSubmit} />
          </div>
        )}
        {showRdvForm && (
          <div className={styles.group_calendar}>
            <AvailabilityProvider>
              <Calendar onSlotSelect={handleSlotSelect} />
            </AvailabilityProvider>
            {selectedSlot && (
              <div>
                <p>Vous avez sélectionné le créneau suivant :</p>
                <p>{selectedSlot.start.toDateString()}</p>
                <Form isRdv={true} onFormSubmit={handleFormSubmit} />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
