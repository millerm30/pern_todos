const Todo = require('../models/creataTodoTable.js');

const todoLayer = {
  findAll: findAll,
  createTodo: createTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo
};

function findAll() {
  return Todo.findAll();
};

function createTodo(todo) {
  const newTodo = new Todo(todo);
  return newTodo.save();
};

function updateTodo(todo, id) {
  const updateTodo = {
    description: todo.description
  };
  return Todo.update(updateTodo, { where: { id: id } });
};

function deleteTodo(id) {
  return Todo.destroy({ where: { id: id } });
};

module.exports = todoLayer;