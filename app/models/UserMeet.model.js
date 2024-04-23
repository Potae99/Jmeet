module.exports = (sequelize, Sequelize) => {
    const UserMeet = sequelize.define("usermeeting", {
        UserID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user', // ชื่อโมเดลที่เป็น foreign key
                key: 'UserID' // ชื่อ field ที่เป็น primary key ในโมเดล User
            }
        },
        MeetID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'meet', // ชื่อโมเดลที่เป็น foreign key
                key: 'MeetID' // ชื่อ field ที่เป็น primary key ในโมเดล Meet
            }
        }
    });

    return UserMeet;
}
