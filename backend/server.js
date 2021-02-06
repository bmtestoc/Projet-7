const http = require('http');
const app = require('./app');
const mysql = require('mysql');

// config du serveur
app.listen(5010, function () {
  console.log("server is running on port 5010");
});