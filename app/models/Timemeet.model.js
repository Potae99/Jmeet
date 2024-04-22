module.exports = (sequelize, Sequelize) => {
    const UserTimemeet = sequelize.define("UserTimemeet", {
        // UserID: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: 'Users',
        //         key: 'UserID'
        //     }
        // },
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
