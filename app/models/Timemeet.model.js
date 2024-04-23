module.exports = (sequelize, Sequelize) => {
    const UserTimemeet = sequelize.define("meet", {
        MeetID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        }

    });

    return UserTimemeet;
};
