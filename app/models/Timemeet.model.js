module.exports = (sequelize, Sequelize) => {
    const User = require('./User.model')(sequelize, Sequelize); // Import and initialize User model
    const Room = require('./room.model')(sequelize, Sequelize); // Import and initialize Room model

    const UserTimemeet = sequelize.define("UserTimemeet", {
        MeetID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        },
        UserID: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'UserID'
            }
        },
        RoomID: {
            type: Sequelize.INTEGER,
            references: {
                model: Room,
                key: 'RoomID'
            }
        }
    });

    UserTimemeet.belongsTo(User, { foreignKey: 'UserID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    UserTimemeet.belongsTo(Room, { foreignKey: 'RoomID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    return UserTimemeet;
};
