const db = require("../models");
const config = require("../config/auth.config");
const Todo = db.todo;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //test
    console.log("- todo.controller.js - create");
    console.log('req.session.userId : ' + req.session.userId);
    console.log('req.body.todoContent : ' + req.body.todoContent);
    //
    /*
        Content 입력을 안했을 때
    */
    if(!req.body.todoContent) {
        res.status(400).send({
            message: "Content can not ne empty!"
        });
        return;
    }

    const todo = {
        content: req.body.todoContent,
        userId: req.session.userId
    };

    Todo.create(todo)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Todo."
        });
    });

};

exports.findAll = (req, res) => {
    //test
    console.log("- todo.controller.js - findAll");
    //

    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%`}} : null;

    Todo.findAll({ where: condition })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Todo."
        });
    });

};

exports.findTest = (req, res) => {
    //test
    console.log("- todo.controller.js - findTest");
    //

    Todo.findAll({
        attributes: ['content'],
        where: {
            userId: req.session.userId
        }
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Todo."
        });
    });

};

//test
exports.test = (req, res) => {
    //test
    console.log("- todo.controller.js - test");
    console.log("req.session.userId : " + req.session.userId);
    //

    Todo.findAll({
        attributes: ['content'],
        where: {
            userId: req.session.userId
        },
        include: [{
            model: db.user,
            attributes: ['nickname'],
            where: {
                id: req.session.userId
            }
        }]
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Todo."
        });
    });

};
//