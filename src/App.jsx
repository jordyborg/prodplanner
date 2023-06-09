import React, { useEffect, useState } from "react";
import TodoForm from "./Components/ToDoForm";
import TodoList from "./Components/ToDoList";
import { onValue, ref } from "firebase/database";
import { db, app } from "./firebase";
import LogInForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import { getAuth } from "firebase/auth";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  const auth = getAuth()
  
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, );

    return () => unsubscribe();
  })


  return (
    <Router>
      <div>
        <Header user={user} setUser={setUser}/> 
        <div className="main-div"> 
            <Routes>
              <Route path="/signup" element={<SignUpForm/>} />
              <Route path="/login" element={<LogInForm/>} />
              <Route path="/todolist" element={<TodoList/>} />
              <Route path='/todoform' element={<TodoForm/>}/>
            
            </Routes>
        </div>
        <h1>Todo List</h1>
        
        <TodoList />
      </div>
    </Router>

  );
};

export default App