import React, { useState } from "react";
import styles from "../src/app/style.module.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    object: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/sendSms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+33659690710",
        message: `Quelqu'un souhaite prendre contact avec vous:
        Nom: ${formData.name}
        Email: ${formData.email}
        Téléphone: ${formData.phone}
        Objet de demande de contact: ${formData.object}
        Message: ${formData.message}`,
      }),
    })
      .then((response) => response.json())
      .then((twilioResponse) => {
        alert("Message envoyé avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du message Twilio:", error);
        alert("Une erreur s'est produite lors de l'envoi du message.");
      });
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form_contact}>
      <div className={styles.input_contact}>
        <label htmlFor="name">Votre nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_contact}>
        <label htmlFor="email">Votre email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_contact}>
        <label htmlFor="email">Votre téléphone :</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_contact}>
        <label htmlFor="email">L&lsquo;objet de demande de contact :</label>
        <input
          type="text"
          id="object"
          name="object"
          value={formData.object}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_contact}>
        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit">ENVOYER</button>
    </form>
  );
};

export default Form;
