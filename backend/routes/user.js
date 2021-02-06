const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimit = require("express-rate-limit");

// Limite le nombre d'appels à l'api
const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 2
});

// Import du middleware auth pour la sécurisation des routes 
const auth = require('../middleware/auth');

//Import du middleware multer-config pour les images
const multer = require('../middleware/multer-config');

// Routes de l'API
router.post('/signup', userCtrl.signup);
router.post('/login', apiLimiter, userCtrl.login);
router.get('/oneuser/:id', auth, userCtrl.getOneUser);
router.get('/allusers', auth, userCtrl.getAllUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.get('/fromtoken', auth, userCtrl.getUserDataFromToken);

module.exports = router;