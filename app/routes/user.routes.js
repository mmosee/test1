const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    /*
        비회원도 접근
    */
    app.get("/user/all", controller.allAccess);

    /*
        회원만 접근 (../middleware/authJwt.js 에서 검증)
    */
    app.get("/user/user", [authJwt.verifyToken], controller.userBoard);

};