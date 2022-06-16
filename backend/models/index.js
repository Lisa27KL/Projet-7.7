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
db.posts = require('./postsModel.js')(sequelize,Sequelize);
db.like = require("./likeModel.js")(sequelize, Sequelize);


db.user.hasMany(db.posts, {as:"posts", onDelete: "cascade"});
db.user.hasMany(db.like, { as: "likes" });
db.posts.hasMany(db.like, { as: "likes", onDelete: "cascade" });



// *******************  Posts Associates  *******************
db.posts.belongsTo(db.user,{
  foreignKey:"userId",
  targetKey: "id",
});

db.like.belongsTo(db.posts, {
  foreignKey: "postId",
  targetKey: "id",
});



// *******************  Comments Associates  *******************
// db.comments.belongsTo(db.posts,{
//   foreignKey:"postId",
//   targetKey: "id",
// });
// db.posts.hasMany(db.comments, {as: "comments", onDelete: "cascade"});
// db.user.hasMany(db.comments,{as: "comments", onDelete: "cascade"});


//************************ Like *************************
// db.user.belongsToMany(db.posts, {
//   through: db.like,
//   foreignKey: "userId",
//   otherKey: "postsId"
// });

// db.posts.belongsToMany(db.user, {
//   through: db.like,
//   foreignKey: "postsId",
//   otherKey: "userId"
// });

// db.like.belongsTo(db.user,{
//   foreignKey: "userId",
//   as:'user',
// })

// db.like.belongsTo(db.posts,{
//   foreignKey: "postsId",
//   as:'posts',
// })


//db.ROLES = ["user", "admin"];

module.exports = db;