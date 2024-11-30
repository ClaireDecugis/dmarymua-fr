import appointmentModel from "../models/appointmentModel";

const saveAppointment = async (appointmentData) => {
  try {
    const { description, id_availability } = appointmentData;
    const newAppointment = await appointmentModel.create({
      description,
      id_availability,
    });
    return newAppointment;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde du rendez-vous dans la base de données: ",
      error
    );
    throw new Error(
      "Erreur lors de la sauvegarde du rendez-vous dans la base de données"
    );
  }
};

export { saveAppointment };
