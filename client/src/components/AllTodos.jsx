import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';

const AllTodos = ({todos, setTodos }) => {
  const [editable, setEditable] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [id, setId] = useState("");
  
  const deleteTodo = async (id) => {
    try {   
      await fetch(`http://localhost:3010/api/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const editTodoDescription = async (id) => {
    try {
      const body = { description: editTodo };
      await fetch(`http://localhost:3010/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, description: editTodo } : todo));
      setEditable(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between bg-white w-11/12 ml-auto mr-auto my-2 py-2 border-t-2 border-b-2 md:w-:1/2 lg:w-1/3"
        >
          <div className="w-full">
            {editable && id === todo.id ? (
              <input
                className="border-2 rounded-md p-1 ml-1 w-full"
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
            ) : (
              <p className="px-2 self-center">{todo.description}</p>
            )}
          </div>
          <div className="flex">
            {editable && id === todo.id ? (
              <button
                className="px-2 text-2xl text-black hover:text-green-700"
                onClick={() => editTodoDescription(todo.id)}
              >
                <GiCheckMark />
              </button>
            ) : (
              <button
                className="px-2 text-2xl text-black hover:text-blue-700"
                onClick={() => {
                  setEditable(true);
                  setId(todo.id);
                  setEditTodo(todo.description);
                }}
              >
                <MdModeEdit />
              </button>
            )}
            <button
              className="px-2 text-2xl text-black hover:text-red-700"
              onClick={() => deleteTodo(todo.id)}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllTodos;