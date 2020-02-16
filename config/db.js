const Sequelize = require('sequelize');

// setting up a connection
// const { DATABASE, USERNAME, PASSWORD } = process.env;
// console.log(process.env.DATABASE)
// console.log(process.env.USERNAME)
// console.log(process.env.PASSWORD)
// const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
const db = new Sequelize('password_manager', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports = db