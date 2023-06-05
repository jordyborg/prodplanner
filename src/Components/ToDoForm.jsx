import React, { useState } from "react";
import { push } from "firebase/database";
// import { db } from "./firebase";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        const newTodoRef = push(db.ref("todos"));
        const newTodoKey = newTodoRef.key;
        await newTodoRef.set({
          id: newTodoKey,
          text: text.trim(),
        });
        addTodo({
          id: newTodoKey,
          text: text.trim(),
        });
        setText("");
      } catch (error) {
        console.error("Error adding todo: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;