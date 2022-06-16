module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    image:{
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
    bio:{
      allowNull:true,
      type: Sequelize.STRING,
    },
    role:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
  return User;
};
