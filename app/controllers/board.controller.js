const db = require("../models");
const Board = db.board;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //test
    console.log("- board.controller.js - create");
    //

    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not ne empty!"
        });
        return;
    }

    const board = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        userId: req.session.userId
    };

    Board.create(board)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Board."
        });
    });

};

exports.findAll = (req, res) => {
    //test
    console.log("- board.controller.js - findAll");
    //
    
    //req.query 로 검색기능 가능
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%`}} : null;

    Board.findAll({ where: condition })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Board."
        });
    });
};

exports.findType = (req, res) => {
    //test
    console.log("- board.controller.js - findType");
    //

    Board.findAll({
        where: {
            type: req.body.type
        }
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Board."
        });
    });

};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Board.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Board with id=" + id
        })
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Board.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Board was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Board with id=${id}. Maybe Board was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Board with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Board.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Board was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Board with id=${id}. Maybe Board was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Board with id=" + id
        });
    });
};