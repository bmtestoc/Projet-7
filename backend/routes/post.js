const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

// Import du middleware auth pour la sécurisation des routes 
const auth = require('../middleware/auth');

//Import du middleware multer-config pour les images
const multer = require('../middleware/multer-config');

// Routes de l'API
router.get('/', /*auth, */postCtrl.getAllPosts);
router.get('/:id', /*auth, */postCtrl.getOnePost);
//router.get('/countercomment/:id', /*auth, */postCtrl.getCounterComment);
router.post('/', /*auth, */multer, postCtrl.createPost);
router.put('/:id', /*auth, */multer, postCtrl.updatePost);
router.delete('/:id', /*auth, */postCtrl.deletePost);

module.exports = router;
