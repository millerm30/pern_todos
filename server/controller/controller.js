const todoLayer = require('../layer/tableOps.js');

const todoController = {
  createTodo: createTodo,
  findAll: findAll,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo
};

function createTodo(req, res) {
  const todo = req.body;
  todoLayer.createTodo(todo)
    .then(function(todo) {
      res.status(201).json(todo);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
};

function findAll(req, res) {
  todoLayer.findAll()
    .then(function(todos) {
      res.status(200).json(todos);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
};

function updateTodo(req, res) {
  const todo = req.body;
  const id = req.params.id;
  todoLayer.updateTodo(todo, id)
    .then(function(todo) {
      res.status(200).json({
        message: 'Todo updated successfully',
        todo: todo
      });
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
};

function deleteTodo(req, res) {
  const id = req.params.id;
  todoLayer.deleteTodo(id)
    .then(function(todo) {
      res.status(200).json({
        message: 'Todo deleted successfully',
        todo: todo
      });
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
};

module.exports = todoController;