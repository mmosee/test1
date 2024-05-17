const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*
    회원가입 DB 등록
*/
exports.signup = async (req, res) => {
    try {
        /*
            User 생성
        */
        const user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            nickname: req.body.nickname,
        });

        /*
            Role 설정
        */
        if(req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });
            
            const result = user.setRoles(roles);
            if(result) res.send({ message: "User registered successfully!"});
        } else {
            const result = user.setRoles([1]);
            if(result) res.send({ message: "User registered successfully!"});
        }

    } catch(error) {
        res.status(500).send({ message: error.message });
    }
};

/*
    로그인
*/
exports.signin = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if(!user) {
            return res.status(404).send({ message: "User Not found."});
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        /*
            JsonWebToken 발급
        */
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                    algorithm: 'HS256',
                                    allowInsecureKeySizes: true,
                                    expiresIn: 86400, //24H
                                });

        /*
            UserRole
        */
        let authorities = [];
        const roles = await user.getRoles();
        for(let i=0; i<roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        /*
            Session 에 정보 담기
        */
        req.session.token = token;
        req.session.userId = user.id;
        req.session.email = user.email;
        req.session.nickname = user.nickname;

        return res.status(200).send({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            jwt: req.session.token,
            role: authorities
        });
    } catch(error) {
        return res.status(500).send({ message: error.message });
    }
};

/*
    로그아웃
*/
exports.signout = async(req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch(err) {
        this.next(err);
    }
};