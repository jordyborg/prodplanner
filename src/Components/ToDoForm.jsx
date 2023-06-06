import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db, app } from "../firebase";

const TodoForm = () => {
  const [text, setText] = useState("");
  const collectionRef = collection(db, 'todolist');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collectionRef, {
        item: text
    }) 
    .then((res) => {
        alert('Data added');
      })
      .catch((err) => {
        alert(err.message);
      });
    
   
    // if (text.trim()) {
    //   try {
    //     const newTodoRef = push(db.ref("todos"));
    //     const newTodoKey = newTodoRef.key;
    //     await newTodoRef.set({
    //       id: newTodoKey,
    //       text: text.trim(),
    //     });
    //     addTodo({
    //       id: newTodoKey,
    //       text: text.trim(),
    //     });
    //     setText("");
    //   } catch (error) {
    //     console.error("Error adding todo: ", error);
    //   }
    // }
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