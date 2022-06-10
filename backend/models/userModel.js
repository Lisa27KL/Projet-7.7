module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    avatar:{
      allowNull: true,
      type: Sequelize.STRING,
    },
    pseudo: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  return User;
};
