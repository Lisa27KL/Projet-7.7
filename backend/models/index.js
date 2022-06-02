const dbConfig = require("../configuration/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, Sequelize);
db.role = require("./roleModel.js")(sequelize, Sequelize);
db.posts = require('./postsModel.js')(sequelize,Sequelize);
db.comments = require('./commentsModel.js')(sequelize, Sequelize);

// *******************  User Associates  *******************
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});


// *******************  Posts Associates  *******************
db.posts.belongsTo(db.user,{
  foreignKey:"userId",
  targetKey: "id",
});


// *******************  Comments Associates  *******************
db.comments.belongsTo(db.posts,{
  foreignKey:"postId",
  targetKey: "id",
});


db.user.hasMany(db.posts, {as:"posts", onDelete: "cascade"});
db.posts.hasMany(db.comments, {as: "comments"});
db.user.hasMany(db.comments,{as: "comments"});


db.ROLES = ["user", "admin"];

module.exports = db;