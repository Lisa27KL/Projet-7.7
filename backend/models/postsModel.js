module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 0,
     },
    //  dislikes: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   default: 0,
    //  },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
  return Posts;
};
