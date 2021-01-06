const Sequelize = require("sequelize");
const sequelize = require("./db.js");

// Définition du modèle
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    user_profile: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'profile',
        }
    },
    
        tableName: 'post'
    });

    return Post;

};
