import React from "react";
import TodoItem from "./ToDoItem";
import { db, app } from "../firebase";
import { getDocs, collection } from 'firebase/firestore';
import { useState } from "react";

const TodoList = () => {
    const [list, setList] = useState([]);
    
    const collectionRef = collection(db, 'todolist');
    
    const getDoc = () => {
    getDocs(collectionRef).then((res) => {
        res.docs.forEach((item) => {
            const task = item.data();
            // setList((prevState) => {
                if (!list.includes(task.item)) {
                    setList(prevState => [...prevState, task.item]);
                }
        });
    });
    console.log(list);
};
getDoc()

  return (
   <div>
    <button onClick={getDoc}>get data</button>
    <ul>
     { list.map((item) => {
       return <li>
        <input
        type="checkbox" />
            {item} 
        </li>
     })}

    </ul>
    </div>
  );
};

export default TodoList;