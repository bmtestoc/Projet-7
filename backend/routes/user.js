const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimit = require("express-rate-limit");

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
router.get('/:id', /*auth,*/ userCtrl.getOneUser);
router.get('/', /*auth, */userCtrl.getAllUser);
router.delete('/:id', /*auth, */userCtrl.deleteUser);
router.put('/:id', /*auth, multer, */userCtrl.updateUser);

module.exports = router;