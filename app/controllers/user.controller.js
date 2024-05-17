/*
    비회원도 접근
*/
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

/*
    회원만 접근 (../routes/user.routes.js 에서 검증)
*/
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");

    /*
        Test 로그인 유저 확인
    */
   console.log("- user.controller.js - req.session.userId : " + req.session.userId);
   console.log("- user.controller.js - req.session.email : " + req.session.email);
   console.log("- user.controller.js - req.session.nickname : " + req.session.nickname);
};