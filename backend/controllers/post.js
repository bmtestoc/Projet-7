const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Import du modèle post
const db = require("../models/db");
const post = require('../models/post');
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
    const postId = req.params.id;
    var condition = postId ?
        { id: { [Op.eq]: postId } } : null;
    Post.destroy({ where: condition })
        .then(data => {
            let message = 'Post supprimé avec succès';
            let statut = 200;
            if (data === 0) {
                message = 'Post inexistant';
                //on renvoie le statut 404 not found si utilisateur inexistant
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
/*
//Affichage de tous les posts
exports.getAllPosts = (req, res, next) => {
    const search = req.query.search;
    
    let offset = 0;
    if(req.query.offset) {
        offset = parseInt(req.query.offset);
    }
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
*/
//Modification d'un post
exports.updatePost = (req, res, next) => {
    const postId = parseInt(req.params.id)
    let postUpdate = {};
    if (req.body.title) {
        postUpdate['title'] = req.body.title;
    }
    if (req.body.content) {
        postUpdate['content'] = req.body.content;
    }
    var condition = postId ?
        { id: postId } : null;
    Post.update(
        postUpdate,
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
    
    /*var condition = postId ?
        { id: { [Op.eq]: postId } } : null;*/
        (async () => {
            const postId = req.params.id;
            onePost = await db.sequelize.query("SELECT post.*, user.login FROM `post` INNER JOIN `user` ON post.user_id = user.id WHERE post.id=:id", {
                replacements: { id: postId },
                type: db.sequelize.QueryTypes.SELECT
            });
            if(onePost.length === 1) {
                onePost = onePost[0];
            }
            return res.status(200).json(onePost);
        })();
    /*Post.findOne({ where: condition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Cet ID est inconnu."
            });
        });*/
};

//Affichage de tous les posts
exports.getAllPosts = (req, res, next) => {
    const search = req.query.search;
    let offset = 0;
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    try {
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1],
                decoded;
            try {
                decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            var connectedUserId = decoded.userId;

        }
    } catch (error) {

    }

    (async () => {
        postLogin = await db.sequelize.query("SELECT (time_to_sec(timediff(NOW(), post.createdAt)) / 3600) AS nb_hours_post, post.id AS post_id, post.user_id AS post_user_id, post.createdAt AS post_createdAt, post.content AS post_content, post.title AS post_title, post.updatedAt AS post_updatedAt, user.login AS user_login, user.last_connection AS user_last_connexion, user.picture AS user_picture, user.profile AS user_profile, user.email AS user_email, user.is_active AS user_is_active, user.createdAt AS user_createdAt, user.updatedAt AS user_updatedAt, COUNT(post_comment.id) AS nb_comments, IF(count(pc2.id) = 0, COUNT(post_comment.id), count(pc2.id)) AS nb_comments_unread, post_read.last_read, IF(post.user_id = :id OR user.profile = 1, 1, 0) AS delete_link FROM post LEFT JOIN user ON post.user_id = user.id LEFT JOIN post_comment ON post_comment.post_id = post.id LEFT JOIN post_read ON post_read.post_id = post.id AND post_read.user_id = :id LEFT JOIN post_comment pc2 ON pc2.post_id = post.id AND pc2.createdAt > post_read.last_read GROUP BY post.id ORDER BY nb_comments_unread DESC, post.`createdAt` DESC LIMIT 0, 100", {
            replacements: { id: connectedUserId },
            type: db.sequelize.QueryTypes.SELECT
        });
        return res.status(200).json(postLogin);
    })();
};
/*
//Compteur de commentaires
exports.getCounterComment = (req, res, next) => {
    const search = req.query.search;
    let offset = 0;
    if(req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    (async() => {
        counterComment = await db.sequelize.query("SELECT COUNT(post_comment.id) AS nb_comment, post_id FROM post_comment INNER JOIN post ON post_comment.post_id = post.id GROUP BY post_id", {
        //replacements: {id: req.user.id},
        type: db.sequelize.QueryTypes.SELECT
      });
      console.log(counterComment);
      return res.status(200).json(counterComment);
    })();
};
*/