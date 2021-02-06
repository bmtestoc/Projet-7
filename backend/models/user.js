const Sequelize = require("sequelize");
const sequelize = require("./db.js");
const bcrypt = require('bcrypt');

// Définition du modèle
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
            set(value) {
                const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
                this.setDataValue('password', hash);
            },
        },
        last_connection: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        picture: {
            type: Sequelize.BLOB,
            allowNull: true
        },
        profile: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        is_active: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
        {
            tableName: 'user'
        });
    return User;
};