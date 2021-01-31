const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const user = require("./user.js");

/* Initialise Sequelize */
const config = {
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    host: dbConfig.HOST,
    dialect: "mysql",
    dialectOptions: {
        useUTC: false, // for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '+01:00', // for writing to database
}

const sequelize = new Sequelize(config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);
db.post_comment = require("./post_comment.js")(sequelize, Sequelize);
db.post_read = require("./post_read.js")(sequelize, Sequelize);

module.exports = db;