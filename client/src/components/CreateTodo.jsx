import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CreateTodo = ({ setNewTodo }) => {
  const [ inputs, setInputs ] = useState({
    description: "",
  });
  const [ status, setStatus ] = useState("Add");

  const { description } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const body = { description };
      const response = await fetch("http://localhost:3010/api/addtodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setInputs({ description: "" });
      const jsonData = await response.json();
      setNewTodo(jsonData);
      setStatus("Add");
      toast.success(`${description} added to the list!`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='w-11/12 flex flex-col ml-auto mr-auto border-2 py-4 px-6 rounded-xl shadow-md bg-white mb-6 md:w-1/2 lg:w-1/3'>
      <h1 className='text-xl font-bold'>Create Todo</h1>
      <form onSubmit={onSubmitForm} className='flex flex-row'>
        <input
          className='border-2 rounded-md p-2 mt-2 w-full'
          placeholder='Enter your todo...'
          type="text"
          name="description"
          value={description}
          onChange={e => onChange(e)}
        />
        <button
          disabled={description === ''}
          type="submit"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {status}
        </button>
      </form>
      <Toaster />
    </div>
  )
};

export default CreateTodo;