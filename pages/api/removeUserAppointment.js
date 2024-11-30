const {
  userAppointment,
} = require("../../backend/models/userAppointmentModel");

router.post("/api/removeUserAppointment", async (req, res) => {
  const { appointmentId, userId } = req.body;

  try {
    await userAppointment.destroy({
      where: { id_user_appointment: userId, id_appointment: appointmentId },
    });

    res.status(200).json({ message: "User appointment removed" });
  } catch (error) {
    console.error("Error removing user appointment: ", error);
    res.status(500).json({ error: "Could not remove user appointment" });
  }
});
