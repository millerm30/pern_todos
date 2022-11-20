import React, { useState, useEffect} from 'react';
import AllTodos from './components/AllTodos';
import AddTodo from './components/CreateTodo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState([]);

  const getAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:3010/api/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, [newTodo]);

  return (
    <>
      <h1 className="text-center text-4xl font-bold m-5">Todo List</h1>
      <AddTodo setNewTodo={setNewTodo} newTodo={newTodo} />
      <AllTodos todos={todos} setTodos={setTodos} />
    </>
  );
};

export default App;
