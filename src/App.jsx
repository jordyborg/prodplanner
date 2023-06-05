import React, { useEffect, useState } from "react";
import TodoForm from "./Components/ToDoForm";
import TodoList from "./Components/ToDoList";
import { onValue, ref } from "firebase/database";
// import { db } from "./firebase";
import LogInForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdhvLNasFwqYYeT5x7K4hKcstCay19maM",
  authDomain: "prodplanner-a667f.firebaseapp.com",
  projectId: "prodplanner-a667f",
  storageBucket: "prodplanner-a667f.appspot.com",
  messagingSenderId: "945041933952",
  appId: "1:945041933952:web:2b7159830a5f4b8ae00865",
  measurementId: "G-5P9846WT5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosRef = ref(db, "todos");
        const snapshot = await onValue(todosRef);
        const todosData = snapshot.val();
        if (todosData) {
          const fetchedTodos = Object.keys(todosData).map((key) => ({
            id: key,
            ...todosData[key],
          }));
          setTodos(fetchedTodos);
        }
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
    <div> 
      <SignUpForm /> 
      <LogInForm /> 
    </div>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App
