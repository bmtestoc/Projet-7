const Sequelize = require("sequelize");
const sequelize = require("./db.js");

// Définition du modèle
module.exports = (sequelize, Sequelize) => {
    const postComment = sequelize.define("post_comment", {
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
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
        {
            tableName: 'post_comment'
        });
    return postComment;
};
