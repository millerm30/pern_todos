const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const database = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = database;