import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db, app } from "../firebase";
import './todoform.css'
const TodoForm = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  
  const collectionRef = collection(db, 'todolist');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collectionRef, {
      category: category,
      item: text
    }) 
    .then((res) => {
      alert('Data added');
    })
    .catch((err) => {
      alert(err.message);
    });
    setText("");
    setCategory('')
  };

  return (
    <div className="post-it-note">
      <h2 className="post-it-note__header">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>date</label>
        <input
          type="date"
          min="2023-01-01"
          max="2024-01-01"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="post-it-note__input"
          placeholder="Write your todo here..."
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="post-it-note__input"
        >
          <option value="">Select category</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="media">Media</option>
          <option value="personal">Personal</option>
  
        </select>
        <button type="submit" className="post-it-note__button">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;