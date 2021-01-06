const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Import du modèle post
const db = require("../models/db");
const Post = db.post;
const userValidator = require('./user.validator');
const Op = db.Sequelize.Op;

// Création d'un post
exports.createPost = (req, res, next) => {
     
        Post.create({
            user_id: req.body.user_id,
            content: req.body.content,
            title: req.body.title,
        })
            .then(() => res.status(201).json({ message: 'Sujet créé !' }))
};

//Suppression d'un post
exports.deletePost = (req, res, next) => {
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

//Affichage de tous les posts
exports.getAllPosts = (req, res, next) => {
    const search = req.query.search;
    const offset = parseInt(req.query.offset);
    var condition = search ?
        {
            [Op.or]: [
                { login: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        } : null;
    Post.findAll({ where: condition,
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
                    err.message || "Pas de post."
            });
        });
};

//Modification d'un post
exports.updatePost = (req, res, next) => {
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

//Affichage d'un post
exports.getOnePost = (req, res, next) => {
    const postId = req.params.id;
    var condition = postId ?
        { id: { [Op.eq]: postId } } : null;
    Post.findOne({ where: condition })
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
