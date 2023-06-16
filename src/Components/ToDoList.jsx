import React, { useEffect } from "react";
import { db, app } from "../firebase";
import { getDocs, collection, doc, documentId, deleteDoc, query, where } from 'firebase/firestore';
import { useState } from "react";
import './todolist.css'

const TodoList = () => {
    const [list, setList] = useState([]);
    const [category, setCategory] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    
    const todoListItems = [
        {
          date: '13-6-2023',
          item: 'crackers'
        },
        {
          date: '13-6-2023',
          item: 'crackers'
        },
        {
          date: '13-6-2023',
          item: 'crackers'
        }
       ]

    const collectionRef = collection(db, 'todolist');
    
    const getDoc = () => {
        let query1 = collectionRef;
        if (category !== "") {
            query1 = query(collectionRef, where("category", "==", category));
        }
        getDocs(query1).then((res) => {
        const newData = res.docs.map((item) => ({
            id: item.id,
            item: item.data().item,
            isDeleted: item.data().isDeleted || false
        }))
        setFilteredItems(newData)
        setList(newData);
        })  
    };
    
    useEffect(() => {
        getDoc()
    }, [category, list])

    const deleteDocument =  (documentId) => {
        deleteDoc(doc(collectionRef, documentId))
            .then(() => {
                console.log('Item complete!')
                const updatedList = list.map((item) => {
                    if (item.id === documentId) {
                        return {...item, isDeleted: true}
                    }
                    return item;
                })
                setList(updatedList);
                setFilteredItems(updatedList);
            })
       
    }

    const handleCheckboxChange = (index) => {
        const updatedList = [...list];
        updatedList.splice(index, 1);
        setList(updatedList);
      };
    

  return (
   <div>
    <h1>Todo List</h1>
    <div className="button-container">
        <button onClick={getDoc}>Refresh List!</button>
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
        >
            <option value="">All categories</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="media">Media</option>
            <option value="personal">Personal</option>
            
        </select>
    </div>
    <ul className="todoitems">
        {filteredItems.map((item, index) => (
          <li key={item.id} style={{textDecoration: item.isDeleted ? 'line-through' : 'none'  }}> 
            <input
              type="checkbox"
              onClick={() => deleteDocument(item.id)}
            />
            {item.item}
            
          </li>
        ))}
        {todoListItems.map((item, index) => (
         <li key={index}> 
            <input
                 type="checkbox"
            />
        { `${item.date} ${item.item}` }

        </li>
        ))}
    
    </ul> 
    </div>
  );
};

export default TodoList;