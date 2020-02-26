const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
    // attributes
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    // options
    timestamps: true
  });

module.exports = User;