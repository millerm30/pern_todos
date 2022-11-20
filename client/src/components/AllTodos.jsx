import React from 'react';
import { Toaster } from 'react-hot-toast';
import EditTodo from './EditTodo';

const AllTodos = ({todos, setTodos }) => {

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
              <EditTodo todo={todo} todos={todos} setTodos={setTodos} />
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