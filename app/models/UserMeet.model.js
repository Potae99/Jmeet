module.exports = (sequelize, Sequelize) => {
const UserMeet = sequelize.define("UserMeet", {
   
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    MeetID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
});
    return UserMeet;
}