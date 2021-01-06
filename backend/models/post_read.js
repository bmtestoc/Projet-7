const Sequelize = require("sequelize");
const sequelize = require("./db.js");

// Définition du modèle 
module.exports = (sequelize, Sequelize) => {
    const postRead = sequelize.define("post_read", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
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
    }
    },
    {
        tableName: 'post_read'
    });

    return postRead;
};
