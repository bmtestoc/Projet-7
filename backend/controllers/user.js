const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Import du modèle user
const db = require("../models/db");
const User = db.user;
const userValidator = require('./user.validator');
const Op = db.Sequelize.Op;

// Inscription d'un user
exports.signup = (req, res, next) => {
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
      .catch(error => res.status(400).json({
        message: 'Utilisateur déjà existant !',
        erreur: error
      }));
  }
  else {
    return res.status(404).json({ message: 'Le mot de passe doit contenir au moins un nombre, une minuscule, une majuscule et être composé de 6 caractères minimum' });
  }
};

// Connexion d'un user
exports.login = (req, res, next) => {
  User.findOne({ where: { login: req.body.login } })
    .then(user => {
      if (!user || user.is_active === 0) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      }
            bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(404).json({ message: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            userLogin: user.login,
            profile: user.profile,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Suppression d'un user
exports.deleteUser = (req, res, next) => {
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
      User.findOne({ where: { id: connectedUserId } }).then(function (connectedUser) {
        const userId = parseInt(req.params.id);
        var condition = userId ?
          { id: { [Op.eq]: userId } } : null;

        if (connectedUserId === userId || connectedUser.profile === 1) {
          User.destroy({ where: condition })
            .then(data => {
              let message = 'Utilisateur supprimé avec succès';
              let statut = 200;
              if (data === 0) {
                message = 'Utilisateur inexistant';
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
        }
        else {
          res.status(401).json({ message: "Action non autorisée" });
        }
      })
        .catch(err => {
          res.status(500).json({
            message:
              err.message
          })
        })
        ;
    }
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getUserDataFromToken = function (req, res) {
  try {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.split(' ')[1],
        decoded;
      try {
        decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      var userId = decoded.userId;
      User.findOne({ where: { id: userId } }).then(function (user) {
        return res.status(200).json(user);
      })
        .catch(err => {
          res.status(500).json({
            message:
              err.message
          })
        });
    }
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

//Affichage de tous les users
exports.getAllUser = (req, res, next) => {
  const search = req.query.search;
  var condition = search ?
    {
      [Op.or]: [
        { login: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ]
    } : null;
  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Pas de résultat pour cette recherche."
      });
    });
};

//Modification d'un user
exports.updateUser = (req, res, next) => {
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
  if (typeof req.body.profile !== 'undefined') {
    userUpdate['profile'] = req.body.profile;
  }
  if (req.body.email) {
    userUpdate['email'] = req.body.email;
  }
  if (typeof req.body.is_active !== 'undefined') {
    userUpdate['is_active'] = req.body.is_active;
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

//Affichage d'un user
exports.getOneUser = (req, res, next) => {
  const userId = req.params.id;
  var condition = userId ?
    { id: { [Op.eq]: userId } } : null;
  User.findOne({ where: condition })
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