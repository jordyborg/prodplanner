import React from "react";
import { remove } from "firebase/database";
// import { db } from "./firebase";

const TodoItem = ({ todo, deleteTodo }) => {
  const handleDelete = async () => {
    try {
      await remove(db.ref(`todos/${todo.id}`));
      deleteTodo(todo.id);
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <li>
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;