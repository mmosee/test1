const db = require("../models");
const Comment = db.comment;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //test
    console.log("- comment.controller.js - create");
    //

    if(!req.body.comment) {
        res.status(400).send({
            message: "Content can not ne empty!"
        });
        return;
    }

    const comment = {
        writer: req.session.nickname,
        comment: req.body.comment,
        userId: req.session.userId,
        boardId: req
    };

    Comment.create(comment)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Comment."
        });
    });

};