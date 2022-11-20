import React, { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import toast, { Toaster } from 'react-hot-toast';
import DeleteTodo from './DeleteTodo';

const AllTodos = ({todos, setTodos }) => {
  const [editable, setEditable] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [id, setId] = useState("");

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
      toast.success('Todo updated!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    {todos.length === 0 ? 
      <div className='w-11/12 flex flex-col ml-auto mr-auto border-2 py-4 px-6 rounded-xl shadow-md bg-white mb-6 md:w-1/2 lg:w-1/3'>
        <h2 className="text-xl text-center">📎Nothing added to your list! 📓 </h2>
      </div> : (
      <div className='w-11/12 flex flex-col ml-auto mr-auto border-2 py-4 px-6 rounded-xl shadow-md bg-white mb-6 md:w-1/2 lg:w-1/3'>
        <h1 className='text-xl font-bold'>All Todos</h1>
        <ul className='mt-4'>
          {todos.map(todo => (
            <li key={todo.id} className='flex justify-between items-center border-b-2 py-2'>
              <div className='flex items-center w-full'>
                {editable && id === todo.id ? (
                  <input type='text' className='mr-2 w-full' value={editTodo} onChange={e => setEditTodo(e.target.value)} />
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
                  <button className='mr-2' onClick={() => {
                    setEditable(true);
                    setEditTodo(todo.description);
                    setId(todo.id);
                  }}>
                    <MdModeEdit className='text-blue-500 text-xl hover:text-blue-700' />
                  </button>
                )}
                <DeleteTodo todo={todo} todos={todos} setTodos={setTodos} />                
              </div>
            </li>
          ))}
        </ul>
        <Toaster />
      </div>
      )
      }
    </>
  )};

export default AllTodos;