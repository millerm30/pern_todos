const express = require('express');
const router = express.Router();
const todoController = require('../controller/controller.js');

router.post('/addtodo', todoController.createTodo);
router.get('/todos', todoController.findAll);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;