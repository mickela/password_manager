const Sequelize = require('sequelize');
const db = require('db');

const Credential = db.define('credential', {
    // attributes
    app: {
      type: Sequelize.STRING,
      allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    altLogin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // password: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
  }, {
    // options
    timestamps: true
  });