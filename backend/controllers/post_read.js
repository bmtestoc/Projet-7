const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Import du modèle post_read
const db = require("../models/db");
const post_read = require('../models/post_read');
const postRead = db.post_read;
const userValidator = require('./user.validator');
const Op = db.Sequelize.Op;

// Création d'une lecture de commentaire
exports.createPostRead = (req, res, next) => {

    postRead.create({
        user_id: req.body.user_id,
        last_read: req.body.last_read,
        post_id: req.body.post_id,
    })
        .then(() => res.status(201).json({ message: 'Affiché comme lu' }))

};

//Modification d'une lecture de commentaire
exports.updatePostRead = (req, res, next) => {
    const postReadId = parseInt(req.params.id)
    let postReadUpdate = {};
    if (req.body.last_read) {
        postReadUpdate['last_read'] = req.body.last_read;
    }
    var condition = postReadId ?
        { id: postReadId } : null;
    postRead.update(
        postReadUpdate,
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

//Consulter une lecture de commentaire
exports.getOnePostRead = (req, res, next) => {
//    console.log(req.params);
    const PostReadUserId = req.params.userid;
    const PostReadPostId = req.params.postid;
    const conditions = {
        user_id: { [Op.eq]: PostReadUserId },
        post_id: { [Op.eq]: PostReadPostId } 
    }
    postRead.findOne({ where: conditions })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });

    
    
    /*if ((PostReadUserId = post_read.user_id) && (PostReadPostId = post_read.post_id)) {
        postRead.update(
            postReadUpdate,
            {
                where: ['last_read']
            })
    } else {
        postRead.create({
            user_id: PostReadUserId,
            post_id: PostReadPostId,
        })
    }*/
    /*var condition = PostReadId ?
        { id: { [Op.eq]: PostReadId } } : null;
        postRead.findOne({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Cet ID est inconnu."
            });
        });*/
};

//Suppression d'une lecture de commentaire
exports.deletePostRead = (req, res, next) => {
    const PostReadId = req.params.id;
    var condition = PostReadId ?
        { id: { [Op.eq]: PostReadId } } : null;
    postRead.destroy({ where: condition })
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

//Consulter toutes les lectures de commentaires
exports.getAllPostRead = (req, res, next) => {
    const search = req.query.search;
    const offset = parseInt(req.query.offset);
    var condition = search ?
        {
            [Op.or]: [
                { login: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        } : null;
    postRead.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        //offset: offset,
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