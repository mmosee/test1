const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ name: "nms-session", keys: ["COOKIE_SECRET"], httpOnly: true }));
app.use(bodyParser.urlencoded({extended : true}));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

/*
    DB 초기화 (force: ture 이면 table이 존재할 땐 drop, 없으면 건들지 않음)
*/
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

//simple route
app.get("/test", (req, res) => {
    res.json({ message: "Welcome to nms application"});
});

/*
    routes
*/
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/todo.routes")(app);
require("./app/routes/board.routes")(app);

/*
    포트 설정 및 Listen
*/
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serer is running on port ${PORT}`);
});

/*
    DB role 설정
*/
function initial() {
    Role.create({
        id: 1,
        name: "user",
    });

    Role.create({
        id: 2,
        name: "admin",
    });
}
