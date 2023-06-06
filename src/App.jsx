import React, { useEffect, useState } from "react";
import TodoForm from "./Components/ToDoForm";
import TodoList from "./Components/ToDoList";
import { onValue, ref } from "firebase/database";
import { db, app } from "./firebase";
import LogInForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import './App.css'

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

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  console.log(todos);

  return (
    <div>
    <div> 
      <SignUpForm /> 
      <LogInForm /> 
    </div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App
