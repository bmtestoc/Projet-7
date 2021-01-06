const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Import du modèle postComment
const db = require("../models/db");
const post_comment = require('../models/post_comment');
const Post = db.post_comment;
const userValidator = require('./user.validator');
const Op = db.Sequelize.Op;

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    if (userValidator.isGoodPassword(req.body.password)) {
        User.create({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
            picture: req.body.picture,
            profile: 0,
            is_active: 1
        })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ message: 'Utilisateur déjà existant !' }));
    }
    else {
        return res.status(404).json({ message: 'Le mot de passe doit contenir au moins un nombre, une minuscule, une majuscule et être composé de 6 caractères minimum' });
    }
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    const userId = req.params.id;
    var condition = userId ?
        { id: { [Op.eq]: userId } } : null;
    User.destroy({ where: condition })
        .then(data => {
            res.sendStatus(data);
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
    const offset = parseInt(req.query.offset);
    var condition = search ?
        {
            [Op.or]: [
                { login: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        } : null;
        post_comment.findAll({ where: condition,
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: 100
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Pas de résultat pour cette recherche."
            });
        })
    };


//Modification d'un commentaire
exports.updateComment = (req, res, next) => {
    const userId = parseInt(req.params.id)
    let userUpdate = {};
    if (req.body.login) {
        userUpdate['login'] = req.body.login;
    }
    if (req.body.password) {
        userUpdate['password'] = req.body.password;
    }
    if (req.body.picture) {
        userUpdate['picture'] = req.body.picture;
    }
    if (req.body.profile) {
        userUpdate['profile'] = req.body.profile;
    }
    if (req.body.email) {
        userUpdate['email'] = req.body.email;
    }
    var condition = userId ?
        { id: userId } : null;
    User.update(
        userUpdate,
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
        postComment.findOne({ where: condition })
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
