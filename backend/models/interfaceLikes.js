const { queryInterface } = require("sequelize/types");
const { Sequelize } = require(".");

module.exports ={
    up:(queryInterface, Sequelize)=>{
        return queryInterface.createTable("like", {
            id:{
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
              },
              postsId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model: "posts",
                    key: "id"
                  }
              },
              userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model: "user",
                    key: "id"
                  }
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
              },
              updateAt: {
                allowNull: false,
                type: Sequelize.DATE,
              },
        })
    }
}