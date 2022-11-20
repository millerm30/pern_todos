import React, { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import toast from 'react-hot-toast';
import DeleteTodo from './DeleteTodo';


const EditTodo = ({ todo, setTodos, todos}) => {
  const [editable, setEditable] = useState(false);
  const [editTodo, setEditTodo] = useState('');
  const [id, setId] = useState('');

  const editTodoDescription = async (id) => {
    try {
      const body = { description: editTodo };
      await fetch(`http://localhost:3010/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, description: editTodo } : todo
        )
      );
      setEditable(false);
      toast.success('Todo updated!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className='flex items-center w-full'>
        {editable && id === todo.id ? (
          <input
            type='text'
            className='mr-2 w-full border-2 rounded-md p-1'
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : (
          <p className=''>{todo.description}</p>
        )}
      </div>
      <div className='flex items-center'>
        {editable && id === todo.id ? (
          <button className='mr-2' onClick={() => editTodoDescription(todo.id)}>
            <GiCheckMark className='text-green-500 text-xl hover:text-green-700' />
          </button>
        ) : (
          <button
            className='mr-2'
            onClick={() => {
              setEditable(true);
              setEditTodo(todo.description);
              setId(todo.id);
            }}
          >
            <MdModeEdit className='text-blue-500 text-xl hover:text-blue-700' />
          </button>
        )}
        <DeleteTodo todo={todo} todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default EditTodo;