const Sequelize = require('sequelize');
const db = require('../config/db');

const Credential = db.define('credential', {
    // attributes
    user_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    app: {
      type: Sequelize.STRING,
      allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    altLogin: {
        type: Sequelize.STRING,
        allowNull: false
    },
  }, {
    // options
    timestamps: true
  });

module.exports = Credential;