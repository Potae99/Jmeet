module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        UserID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING

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