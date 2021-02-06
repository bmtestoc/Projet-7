const express = require('express');
const router = express.Router();
const postCommentCtrl = require('../controllers/post_comment');

// Import du middleware auth pour la sécurisation des routes 
const auth = require('../middleware/auth');

//Import du middleware multer-config pour les images
const multer = require('../middleware/multer-config');

// Routes de l'API
router.get('/', auth, postCommentCtrl.getAllComments);
router.get('/:id', auth, postCommentCtrl.getOneComment);
router.post('/', auth, multer, postCommentCtrl.createComment);
router.put('/:id', auth, multer, postCommentCtrl.updateComment);
router.delete('/:id', auth, postCommentCtrl.deleteComment);

module.exports = router;
