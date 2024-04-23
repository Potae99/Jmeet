module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        UserID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Firstname: {
            type: Sequelize.STRING

        },
        Lastname: {
            type: Sequelize.STRING

        },
        Callname: {
            type: Sequelize.STRING

        }

    });
    return User;


};