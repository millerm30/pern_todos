const Sequelize = require('sequelize');
const database = require('../config/database.js');

// Create a table in the todo_pern database

const Todo = database.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Todo;