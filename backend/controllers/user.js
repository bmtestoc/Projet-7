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
          .catch(error => res.status(400).json({ message: 'Utilisateur déjà existant !' }));
  }
  else {
    return res.status(404).json({ message: 'Le mot de passe doit contenir au moins un nombre, une minuscule, une majuscule et être composé de 6 caractères minimum' });
  }
};

// Connexion d'un user
exports.login = (req, res, next) => {
  User.findOne({ where: { login: req.body.login } })
    .then(user => { console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      }

      console.log(bcrypt.compareSync(req.body.password, user.password));

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(404).json({ message: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
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