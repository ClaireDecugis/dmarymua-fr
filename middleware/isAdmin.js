const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://user:pass@localhost:3306/database");

const isAdmin = async (email, password) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  try {
    const user = await User.findOne({
      where: { email, password, isAdmin: true },
    });
    return !!user;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'administrateur : ",
      error
    );
    return false;
  }
};

module.exports = isAdmin;
