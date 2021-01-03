const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

/* Initialize Sequelize */
const config = {
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    host: dbConfig.HOST,
    dialect: "mysql"
}

const sequelize = new Sequelize(config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);

module.exports = db;