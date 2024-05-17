const { authJwt } = require("../middleware");
const controller = require("../controllers/todo.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/todo/create", [authJwt.verifyToken], controller.create);

    app.get("/todo/all", [authJwt.verifyToken], controller.findAll);

    app.get("/todo/test", [authJwt.verifyToken], controller.findTest);

    app.get("/test/test", [authJwt.verifyToken], controller.test);

};