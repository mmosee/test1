module.exports = (sequelize, Sequelize) => {
    
    const Todo = sequelize.define("todo", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Todo;
};