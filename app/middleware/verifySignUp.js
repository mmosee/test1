const db = require("../models");
const User = db.user;

//Test
/*
    Email Domain이 dkbmc.com 인지 검증
*/
// checkEmailDomain = async(req, res, next) => {
//     try {
//         const dk = /@dkbmc.com/;
//         const E1 = req.body.email;
//         if(E1.match(dk) == null) {
//             return res.status(500).send({
//                 message: "이메일 도메인이 dkbmc.com 이 아님"
//             });
//         } else {
//             next();
//         }
//     } catch(error) {
//         return res.status(500).send({
//             message: "이메일 도메인이 dkbmc.com 이 아님2"
//         });
//     }
// }
//

/*
    회원가입 시 Email 중복체크
*/
checkDuplicateUsernameOrEmail = async(req, res, next) => {
    try {
        //Email
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if(user) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch(error) {
        return res.status(500).send({
            message: "Unable to validate Email!"
        });
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;