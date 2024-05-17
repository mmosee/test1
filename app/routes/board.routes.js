const { authJwt } = require("../middleware");
const controller = require("../controllers/board.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/board/create", controller.create);

    app.get("/board/all", controller.findAll);

    app.get("/board/type", controller.findType);

    app.get("/board/:id", controller.findOne);

    app.put("/board/u/:id", controller.update);

    app.delete("/board/d/:id", controller.delete);

};