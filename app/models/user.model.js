module.exports = (sequelize, Sequelize) => {
    
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
};