import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

const DeleteTodo = ({ todo, todos, setTodos }) => {
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3010/api/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted!");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <button onClick={() => deleteTodo(todo.id)}>
        <MdDeleteForever className="text-red-500 text-xl hover:text-red-700" />
      </button>
    </>
  );
};

export default DeleteTodo