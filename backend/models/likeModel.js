module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("likes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return Like;
};