import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../src/app/style.module.css";

moment.locale("fr");

const localizer = momentLocalizer(moment);

const MyCalendar = ({ onSelectionConfirm }) => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [last_name, setLast_name] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/getAllAvailabilities");
        if (response.ok) {
          const data = await response.json();
          console.log("Data from API:", data);
          const filteredAvailabilities = data.dates.filter(
            (availability) =>
              availability.period === "am" ||
              availability.period === "pm" ||
              availability.period === "day"
          );
          setAvailabilities(filteredAvailabilities);
          const formattedEvents = filteredAvailabilities.flatMap(
            (availability) => {
              let startHour, endHour;
              if (availability.period === "am") {
                startHour = 9;
                endHour = 12;
              } else if (availability.period === "pm") {
                startHour = 14;
                endHour = 17;
              } else if (availability.period === "day") {
                startHour = 0;
                endHour = 23;
              }
              return {
                title:
                  availability.period === "am"
                    ? "Matinée"
                    : availability.period === "pm"
                    ? "Après-midi"
                    : "Journée",
                start: moment(availability.date, "YYYY-MM-DD")
                  .set("hour", startHour)
                  .toDate(),
                end: moment(availability.date, "YYYY-MM-DD")
                  .set("hour", endHour)
                  .toDate(),
                id: availability.id_availability,
                allDay: availability.period === "day",
              };
            }
          );
          setEvents(formattedEvents);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching availabilities:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSlotSelect = (slotInfo) => {
    console.log("Slot Info in Contact component:", slotInfo);
    const selectedAvailability = availabilities.find(
      (availability) => availability.id_availability === slotInfo.id
    );

    if (selectedAvailability) {
      const formattedSlot = {
        id: selectedAvailability.id_availability,
        start: slotInfo.start,
        title: selectedAvailability.period === "am" ? "Matinée" : "Après-midi",
      };
      setSelectedSlot(formattedSlot);
    }
  };

  const handleEventSelect = (event) => {
    console.log("Event selected:", event);
    const selectedAvailability = availabilities.find(
      (availability) => availability.id_availability === event.id
    );
    if (selectedAvailability) {
      const formattedSlot = {
        start: event.start,
        title: selectedAvailability.period === "am" ? "Matinée" : "Après-midi",
        id: selectedAvailability.id_availability,
      };
      setSelectedSlot(formattedSlot);
    }
  };
  const handleConfirmation = () => {
    if (
      selectedSlot &&
      email &&
      last_name &&
      first_name &&
      phone &&
      description
    ) {
      setIsButtonDisabled(true); // Disable the button after confirmation
      fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          last_name,
          first_name,
          phone,
          email,
        }),
      })
        .then((response) => response.json())
        .then((userData) => {
          console.log(
            "Réponse du serveur après création ou récupération utilisateur:",
            userData
          );

          if (userData.error) {
            alert("Cette adresse e-mail ou numéro de téléphone existe déjà.");
            setIsButtonDisabled(false); // Re-enable the button if there's an error
          } else {
            console.log("selectedSlot.id: " + selectedSlot.id);
            fetch("/api/createAppointment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                description: description,
                validated: false,
                id_availability: selectedSlot.id,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(
                  "Réponse du serveur après création du rendez-vous:",
                  data
                );
                const storedEvents =
                  JSON.parse(localStorage.getItem("confirmedEvents")) || [];
                const updatedEvents = [...storedEvents, selectedSlot];
                localStorage.setItem(
                  "confirmedEvents",
                  JSON.stringify(updatedEvents)
                );
                console.log("userdata: ", userData);
                console.log("data: ", data);
                fetch("/api/createUserAppointment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id_user: userData.id_user,
                    id_appointment: data.id_appointment,
                  }),
                })
                  .then((response) => response.json())
                  .then((userAppointmentData) => {
                    console.log(
                      "UserAppointment created:",
                      userAppointmentData
                    );
                  })
                  .catch((error) => {
                    console.error("Error creating UserAppointment:", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Erreur lors de la création du rendez-vous:",
                  error.message
                );
                alert("Une erreur s'est produite lors de la confirmation.");
                setIsButtonDisabled(false); // Re-enable the button if there's an error
              });
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la création ou récupération utilisateur:",
            error
          );
          alert("Une erreur s'est produite lors de la confirmation.");
          setIsButtonDisabled(false); // Re-enable the button if there's an error
        });

      const smsMessage = `
        Une demande de rendez-vous a été effectuée:
        Date: ${moment(selectedSlot.start).format("LLLL")}
        Nom: ${last_name}
        Prénom: ${first_name}
        Téléphone: ${phone}
        Email: ${email}
        Description: ${description}
      `;

      fetch("/api/sendSms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "+33659690710",
          message: smsMessage,
          client: {
            email: email,
            last_name: last_name,
            first_name: first_name,
            phone: phone,
          },
        }),
      })
        .then((response) => response.json())
        .then((twilioResponse) => {
          console.log("Réponse du serveur Twilio:", twilioResponse);
          setConfirmationMessage(
            "Votre demande de contact a bien été prise en compte."
          );
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du message Twilio:", error);
          alert("Une erreur s'est produite lors de la confirmation.");
          setIsButtonDisabled(false); // Re-enable the button if there's an error
        });
    } else {
      alert(
        "Veuillez sélectionner une plage horaire avant de confirmer et remplir tous les champs."
      );
    }
  };

  // Function to handle form input changes and enable the button
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setIsButtonDisabled(false); // Enable the button when input changes
  };

  return (
    <div className={styles.container_calendar_group_flex}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        selectable
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        style={{ height: 500 }}
        messages={{
          today: "Aujourd'hui",
          back: "Précédent",
          next: "Suivant",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
        }}
        eventPropGetter={(event) => {
          const availability = availabilities.find(
            (a) => a.id_availability === event.id
          );
          const isAppointmentDefined =
            availability && availability.id_appointment !== null;
          return isAppointmentDefined
            ? { style: { display: "none" } }
            : { style: {} };
        }}
      />
      {selectedSlot && (
        <div>
          <h4>Plage horaire sélectionnée :</h4>
          <p>Date : {moment(selectedSlot.start).locale("fr").format("LL")}</p>
          <p>Période : {selectedSlot.title}</p>
        </div>
      )}
      <div className={styles.container_input_calendar}>
        <input
          className={styles.input_contact_calendar}
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
          required
        />
        <input
          className={styles.input_contact_calendar}
          type="text"
          placeholder="Nom"
          value={last_name}
          onChange={handleInputChange(setLast_name)}
          required
        />
        <input
          className={styles.input_contact_calendar}
          type="text"
          placeholder="Prénom"
          value={first_name}
          onChange={handleInputChange(setFirst_name)}
          required
        />
        <input
          className={styles.input_contact_calendar}
          type="tel"
          placeholder="Numéro de téléphone"
          value={phone}
          onChange={handleInputChange(setPhone)}
          required
        />
        <textarea
          className={styles.input_contact_calendar}
          name="description"
          placeholder="Entrez une description de la demande de prise de rendez-vous"
          value={description}
          onChange={handleInputChange(setDescription)}
          required
        />
      </div>
      <button
        className={`${styles.button_contact_calendar} ${
          isButtonDisabled ? styles.button_contact_calendar_disabled : ""
        }`}
        onClick={handleConfirmation}
        disabled={isButtonDisabled}
      >
        Confirmer
      </button>
      {confirmationMessage && (
        <p className={styles.confirmation_message}>{confirmationMessage}</p>
      )}
    </div>
  );
};

export default MyCalendar;
