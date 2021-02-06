const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Import du modèle postComment
const db = require("../models/db");
const post_comment = require('../models/post_comment');
const postComment = db.post_comment;
const userValidator = require('./user.validator');
const Op = db.Sequelize.Op;

// Création d'un commentaire
exports.createComment = (req, res, next) => {

    postComment.create({
        user_id: req.body.user_id,
        content: req.body.content,
        post_id: req.body.post_id,
    })
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))

};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    const postCommentId = req.params.id;
    var condition = postCommentId ?
        { id: { [Op.eq]: postCommentId } } : null;
    postComment.destroy({ where: condition })
        .then(data => {
            let message = 'Commentaire supprimé avec succès';
            let statut = 200;
            if (data === 0) {
                message = 'Commentaire inexistant';
                statut = 404;
            }
            res.status(statut).json({ message: message });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Cet ID est inconnu."
            });
        });
};

//Affichage de tous les commentaires
exports.getAllComments = (req, res, next) => {
    const search = req.query.search;

    var condition = search ?
        {
            [Op.or]: [
                { login: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        } : null;
    (async () => {
        const postId = req.query.post_id;
        comments = await db.sequelize.query("SELECT user.login, post_comment.* FROM `post_comment` INNER JOIN user ON user.id = post_comment.user_id WHERE `post_id` = :id ORDER BY `createdAt` DESC", {
            replacements: { id: postId },
            type: db.sequelize.QueryTypes.SELECT
        });
        return res.status(200).json(comments);
    })();
};

//Modification d'un commentaire
exports.updateComment = (req, res, next) => {
    const postCommentId = parseInt(req.params.id)
    let postCommentUpdate = {};
    if (req.body.content) {
        postCommentUpdate['content'] = req.body.content;
    }
    var condition = postCommentId ?
        { id: postCommentId } : null;
    postComment.update(
        postCommentUpdate,
        {
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Cet ID est inconnu."
            });
        });
};

//Affichage d'un commentaire
exports.getOneComment = (req, res, next) => {
    const postCommentId = req.params.id;
    var condition = postCommentId ?
        { id: { [Op.eq]: postCommentId } } : null;
    postComment.findOne({
        where: condition,
        include: [
            { model: User, where: { id: req.params.userId } }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Cet ID est inconnu."
            });
        });
};

