/* Initialize Sequelize */
const config = {
    username: "database username",
    password: "database password",
    database: "database name",
    host: "database's host URL",
    dialect: "mysql" // Other options are postgres, sqlite, mariadb and mssql.
}
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config);

/* Define Models */
sequelize.define("post_read", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    last_read: {
        type: Sequelize.DATE,
        allowNull: false
    },
});