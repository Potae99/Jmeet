module.exports = (sequelize, Sequelize) => {
    const room = sequelize.define("room", {
        RoomID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Roomname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return room;
};
