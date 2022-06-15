module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });
  return Posts;
};
