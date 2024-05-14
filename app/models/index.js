const { logger } = require("sequelize/lib/utils/logger");
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
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
db.Meet = require("./Timemeet.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.Room = require("./room.model.js")(sequelize, Sequelize);



////////////////////////////////////// User and Meet Relation //////////////////////////
// db.User.hasMany(db.Meet, {
//   foreignKey: 'UserID',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

// db.Meet.belongsTo(db.User, {
//   foreignKey: 'UserID',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

// db.Room.hasMany(db.Meet, {
//   foreignKey: 'RoomID',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

// db.Meet.belongsTo(db.Room, {
//   foreignKey: 'RoomID',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE'
// });

// Define the associations
//--------------------------------------------------------
// db.Room.belongsToMany(db.Timemeet, {
//   through: 'meetingroom',
//   foreignKey: 'RoomID',
//   otherKey: 'MeetID'
// });

// db.Timemeet.belongsToMany(db.Room, {
//   through: 'meetingroom',
//   foreignKey: 'MeetID',
//   otherKey: 'RoomID'
// });

// db.User.belongsToMany(db.Meetingroom, {
//   through: 'meetingroom',
//   foreignKey: 'UserID',
//   otherKey: 'MeetingroomID'
// });

// db.Meetingroom.belongsToMany(db.User, {
//   through: 'meetingroom',
//   foreignKey: 'MeetingroomID',
//   otherKey: 'UserID'
// });

// // Additional associations
// db.Meetingroom.belongsTo(db.Timemeet, {
//   as: 'meet',
//   foreignKey: 'MeetID'
// });









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