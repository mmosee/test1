module.exports = (sequelize, Sequelize) => {

    const Board = sequelize.define("board", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });

    return Board;
};