import React, { useState, useEffect } from "react";
import styles from "../src/app/style.module.css";

const UnconfirmedDates = () => {
  const [confirmedEvents, setConfirmedEvents] = useState([]);
  const [unconfirmedEvents, setUnconfirmedEvents] = useState([]);
  const [availabilityDetails, setAvailabilityDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAppointmentDetails, setUserAppointmentDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getAppointment");
        if (!response.ok) {
          throw new Error(
            `Error fetching confirmed events: ${response.status}`
          );
        }

        const events = await response.json();

        const confirmed = events.filter((event) => event.validated);
        const unconfirmed = events.filter((event) => !event.validated);

        setConfirmedEvents(confirmed);
        setUnconfirmedEvents(unconfirmed);

        for (const event of events) {
          const availabilityId = event.id_availability;
          if (availabilityId) {
            const availabilityResponse = await fetch(
              `/api/getAvailability?id_availability=${availabilityId}`
            );
            if (availabilityResponse.ok) {
              const availabilityDetails = await availabilityResponse.json();
              setAvailabilityDetails((prevDetails) => ({
                ...prevDetails,
                [availabilityId]: availabilityDetails,
              }));
            } else {
              console.error(
                `Error fetching availability details for id ${availabilityId}:`,
                availabilityResponse.status
              );
            }
          }

          try {
            const userAppointmentResponse = await fetch(
              `/api/getUserAppointment?id_appointment=${event.id}`
            );

            if (userAppointmentResponse.ok) {
              const userAppointment = await userAppointmentResponse.json();
              const id_user_appointment = userAppointment.id_user_appointment;
              setUserAppointmentDetails((prevUserAppointmentDetails) => [
                ...prevUserAppointmentDetails,
                { appointment_id: event.id, ...userAppointment },
              ]);

              try {
                const userDetailsResponse = await fetch(
                  `/api/getUser?id_user=${id_user_appointment}`
                );

                if (userDetailsResponse.ok) {
                  const user = await userDetailsResponse.json();

                  setUserAppointmentDetails((prevUserAppointmentDetails) => [
                    ...prevUserAppointmentDetails,
                    {
                      appointment_id: event.id,
                      id_user_appointment: user.id_user,
                      ...userAppointment,
                      ...user,
                    },
                  ]);

                  setUserDetails((prevUserDetails) => ({
                    ...prevUserDetails,
                    [user.id_user]: user,
                  }));
                } else {
                  console.error(
                    `Error fetching user details: ${userDetailsResponse.status}`
                  );
                }
              } catch (error) {
                console.error("Error fetching user details:", error);
              }
            } else {
              console.error(
                `Error fetching user appointment details: ${userAppointmentResponse.status}`
              );
            }
          } catch (error) {
            console.error("Error fetching user appointment details:", error);
          }
        }
        setDataReady(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConfirmation = async (id_appointment, userInfo) => {
    console.log("Appointment ID:", id_appointment);
    try {
      const confirmationResponse = await fetch(
        `/api/confirmAppointment?id=${id_appointment}`,
        {
          method: "POST",
        }
      );

      if (confirmationResponse.ok) {
        console.log("Appointment confirmed successfully");

        setUnconfirmedEvents((prev) =>
          prev.filter((event) => event.id !== id_appointment)
        );
        const confirmedEvent = unconfirmedEvents.find(
          (event) => event.id === id_appointment
        );
        setConfirmedEvents((prev) => [
          ...prev,
          { ...confirmedEvent, validated: true },
        ]);

        console.log("userInfo:", userInfo);
        if (userInfo) {
          await fetch("/api/sendConfirmationEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInfo: userInfo }),
          });
        } else {
          console.error("User email is missing or undefined");
        }
      } else {
        console.error(
          `Error confirming appointment: ${confirmationResponse.status}`
        );
      }
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  const handleDeletion = async (id_appointment) => {
    console.log("id_appointment", id_appointment);

    try {
      const userAppointmentResponse = await fetch(
        `/api/getUserAppointment?id_appointment=${id_appointment}`
      );

      if (userAppointmentResponse.ok) {
        const userAppointment = await userAppointmentResponse.json();
        const id_user_appointment = userAppointment.id_user_appointment;
        console.log("id_user_appointment", id_user_appointment);

        const userResponse = await fetch(
          `/api/getUser?id_user=${id_user_appointment}`
        );

        if (userResponse.ok) {
          const userDetails = await userResponse.json();
          const userEmail = userDetails.email;

          const emailNotificationResponse = await fetch(
            `/api/sendRejectEmail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userInfo: userEmail,
              }),
            }
          );

          if (emailNotificationResponse.ok) {
            const userDeletionResponse = await fetch(
              `/api/deleteUser?id_user_appointment=${id_user_appointment}`,
              {
                method: "DELETE",
              }
            );
            if (userDeletionResponse.ok) {
              try {
                const appointmentDeletionResponse = await fetch(
                  `/api/deleteAppointment?id=${id_appointment}`,
                  {
                    method: "DELETE",
                  }
                );
                if (appointmentDeletionResponse.ok) {
                  console.log("Appointment deleted successfully");
                  setUnconfirmedEvents((prev) =>
                    prev.filter((event) => event.id !== id_appointment)
                  );
                } else {
                  console.error(
                    `Error deleting appointment: ${appointmentDeletionResponse.status}`
                  );
                }
              } catch (error) {
                console.error("Error deleting appointment:", error);
              }
            } else {
              console.error(
                `Error deleting user: ${userDeletionResponse.status}`
              );
            }
          } else {
            console.error(
              `Error sending email notification: ${emailNotificationResponse.status}`
            );
          }
        } else {
          console.error(`Error getting user details: ${userResponse.status}`);
        }
      } else {
        console.error(
          `Error getting user appointment details: ${userAppointmentResponse.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting appointment and user:", error);
    }
  };

  return (
    <div className={styles.container_calendar_admin}>
      <h2 className={styles.subtitle_calendar_admin}>
        Événements non confirmés
      </h2>
      <table className={styles.table_calendar_admin}>
        <thead>
          <tr>
            <th className={styles.table_calendar_admin_none}></th>
            <th className={styles.table_calendar_admin_none}></th>
            <th>Informations client</th>
            <th>Description</th>
            <th>Details de la disponibilité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataReady &&
            unconfirmedEvents.map((event, index) => {
              const userAppointmentInfo = userAppointmentDetails.find(
                (ua) => ua.appointment_id === event.id
              );
              const userInfo = userAppointmentInfo
                ? userDetails[userAppointmentInfo.user_id] || null
                : null;

              return (
                <tr key={index}>
                  <td className={styles.table_calendar_admin_none}>
                    {event.date}
                  </td>
                  <td className={styles.table_calendar_admin_none}>
                    {event.period}
                  </td>
                  <td>
                    <ul className={styles.list_table_contact_admin}>
                      {userInfo ? (
                        <>
                          <li>Nom: {userInfo.last_name}</li>
                          <li>Prénom: {userInfo.first_name}</li>
                          <li>Téléphone: {userInfo.phone}</li>
                          <li>Email: {userInfo.email}</li>
                        </>
                      ) : (
                        <li>Informations utilisateur non disponibles</li>
                      )}
                    </ul>
                  </td>
                  <td>{event.description}</td>
                  <td>
                    {availabilityDetails[event.id_availability]?.date} -{" "}
                    {availabilityDetails[event.id_availability]?.period}
                  </td>
                  <td className={styles.table_calendar_admin_group_button}>
                    <button
                      onClick={() =>
                        handleConfirmation(event.id, userInfo?.email)
                      }
                    >
                      Confirmer
                    </button>
                    <button onClick={() => handleDeletion(event.id)}>
                      Supprimer le rendez-vous
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <h2 className={styles.subtitle_calendar_admin}>Événements confirmés</h2>
      <table className={styles.table_calendar_admin}>
        <thead>
          <tr>
            <th className={styles.table_calendar_admin_none}></th>
            <th className={styles.table_calendar_admin_none}></th>
            <th>Informations client</th>
            <th>Description</th>
            <th>Details de la disponibilité</th>
          </tr>
        </thead>
        <tbody>
          {dataReady &&
            confirmedEvents.map((event, index) => {
              const userAppointmentInfo = userAppointmentDetails.find(
                (ua) => ua.appointment_id === event.id
              );
              const userInfo = userAppointmentInfo
                ? userDetails[userAppointmentInfo.user_id] || null
                : null;

              return (
                <tr key={index}>
                  <td className={styles.table_calendar_admin_none}>
                    {event.date}
                  </td>
                  <td className={styles.table_calendar_admin_none}>
                    {event.period}
                  </td>
                  <td>
                    <ul className={styles.list_table_contact_admin}>
                      {userInfo ? (
                        <>
                          <li>Nom: {userInfo.last_name}</li>
                          <li>Prénom: {userInfo.first_name}</li>
                          <li>Téléphone: {userInfo.phone}</li>
                          <li>Email: {userInfo.email}</li>
                        </>
                      ) : (
                        <li>Informations utilisateur non disponibles</li>
                      )}
                    </ul>
                  </td>
                  <td>{event.description}</td>
                  <td>
                    {availabilityDetails[event.id_availability]?.date} -{" "}
                    {availabilityDetails[event.id_availability]?.period}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UnconfirmedDates;
