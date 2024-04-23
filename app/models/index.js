const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.model.js")(sequelize, Sequelize);
db.UserTimemeet = require("./Timemeet.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.UserMeet = require("./UserMeet.model")(sequelize, Sequelize);



////////////////////////////////////// User and Meet Relation //////////////////////////
db.User.belongsToMany(db.UserTimemeet, {
  through: 'usermeeting',
  foreignKey: 'UserID',
  otherKey: 'MeetID'
});
db.UserTimemeet.belongsToMany(db.User, {
  through: 'usermeeting',
  foreignKey: 'MeetID',
  otherKey: 'UserID'
});
db.UserMeet.belongsTo(db.UserTimemeet, {
  as: 'meet',
  foreignKey: 'MeetID'
});








//-------------------------------------------------- User and Meet table have relation -------------------

////////////////////////////////////// User and roles Relation //////////////////////////
//---------------------------------------
db.role.belongsToMany(db.User, {
  through: "user_roles"
});
db.User.belongsToMany(db.role, {
  through: "user_roles"
});

//--------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////-
db.ROLES = ["user", "admin"];

module.exports = db;