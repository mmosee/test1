const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

/*
    timezone => DB에 저장할 때 시간 설정, dialectOptions => DB에서 가져올 때 시간 설정
*/
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        timezone: "+09:00",
        dialectOptions: {
            timezone: "+09:00"
        },
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.todo = require("./todo.model.js")(sequelize, Sequelize);
db.board = require("./board.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);
// db.chat = require("./chat.model.js")(sequelize, Sequelize);

/*
    DB 관계 형성
*/
// user >--< role
db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.ROLES = ["user", "admin"];

// user --< todo
db.user.hasMany(db.todo, { foreignKey: 'userId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });
db.todo.belongsTo(db.user, { foreignKey: 'userId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });

// user --< board
db.user.hasMany(db.board, { foreignKey: 'userId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });
db.board.belongsTo(db.user, { foreignKey: 'userId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });

// user --< comment
db.user.hasMany(db.comment, { foreignKey: 'userId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });
db.comment.belongsTo(db.user, { foreignKey: 'userId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });

// board --< comment
db.board.hasMany(db.comment, { foreignKey: 'boardId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });
db.comment.belongsTo(db.board, { foreignKey: 'boardId', sourceKey: 'id', constraints: true, onDelete: 'cascade' });

//===================================
// db.role.belongsToMany(db.user, {
//     through: "user_roles"
// });
//===================================

module.exports = db;