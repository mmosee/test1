module.exports = (sequelize, Sequelize) => {

    const Comment = sequelize.define("comment", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Comment;
};