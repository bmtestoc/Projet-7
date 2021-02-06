const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const postCommentRoutes = require('./routes/post_comment');
const postReadRoutes = require('./routes/post_read');
const app = express();
const helmet = require('helmet');

// Securisation entêtes HTTP
app.use(helmet());

// Active CORS pour éviter les attaques CSRF
app.use(cors({
  origin: 'http://localhost:8080'
}));

// Pour pouvoir utiliser les données du corps de la requête
app.use(bodyParser.json());

// Pour la gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes API
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post_read', postReadRoutes);
app.use('/api/comment', postCommentRoutes);

module.exports = app;