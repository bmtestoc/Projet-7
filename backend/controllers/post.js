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
        .then((postCreated) => res.status(201).json({ message: 'Sujet créé !', post: postCreated }))
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
    (async () => {
        const postId = req.params.id;
        onePost = await db.sequelize.query("SELECT post.*, user.login FROM `post` INNER JOIN `user` ON post.user_id = user.id WHERE post.id=:id", {
            replacements: { id: postId },
            type: db.sequelize.QueryTypes.SELECT
        });
        if (onePost.length === 1) {
            onePost = onePost[0];
        }
        return res.status(200).json(onePost);
    })();
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
        const page = parseInt(req.query.page);
        const hitsPerPage = 10;
        const offset = (page - 1) * hitsPerPage;
        const nbHits = await Post.count();
        const nbPages = nbHits / hitsPerPage;
        const postLogin = await db.sequelize.query("SELECT (time_to_sec(timediff(NOW(), post.createdAt)) / 3600) AS nb_hours_post, post.id AS post_id, post.user_id AS post_user_id, post.createdAt AS post_createdAt, post.content AS post_content, post.title AS post_title, post.updatedAt AS post_updatedAt, user.login AS user_login, user.last_connection AS user_last_connexion, user.picture AS user_picture, user.profile AS user_profile, user.email AS user_email, user.is_active AS user_is_active, user.createdAt AS user_createdAt, user.updatedAt AS user_updatedAt, COUNT(post_comment.id) AS nb_comments, SUM(CASE WHEN post_comment.createdAt > post_read.last_read THEN 1 ELSE 0 END) AS nb_comments_unread, post_read.last_read FROM post LEFT JOIN user ON post.user_id = user.id LEFT JOIN post_comment ON post_comment.post_id = post.id LEFT JOIN post_read ON post_read.post_id = post.id AND post_read.user_id = :id GROUP BY post.id ORDER BY nb_comments_unread DESC, post.`createdAt` DESC LIMIT :offset, :hitsPerPage", {
            replacements: { id: connectedUserId, offset: offset, hitsPerPage: hitsPerPage },
            type: db.sequelize.QueryTypes.SELECT
        });
        const formattedObject = {
            hits: postLogin,
            nbHits: nbHits,
            page: page,
            nbPages: nbPages,
            hitsPerPage: hitsPerPage
        }
        return res.status(200).json(formattedObject);
    })();
};
