const express = require('express');
const router = express.Router();
const postReadCtrl = require('../controllers/post_read');

// Import du middleware auth pour la sécurisation des routes 
const auth = require('../middleware/auth');

//Import du middleware multer-config pour les images
const multer = require('../middleware/multer-config');

// Routes de l'API
router.get('/:id', auth, postReadCtrl.getOnePostRead);
router.post('/', auth, multer, postReadCtrl.createPostRead);
router.put('/:id', auth, multer, postReadCtrl.updatePostRead);

module.exports = router;