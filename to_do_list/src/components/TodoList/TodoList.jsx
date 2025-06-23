import React, { useEffect, useState } from 'react'
import todosData from '../../data/todos.json'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css'

function TodoList() {


    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");


    useEffect(()=>{
        setTodos(todosData);
    },[]);

//Delete Task------------------------------------------------------------
    const handleDelete = (id) => {
  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
};


//Edit task---------------------------------------------------------------

const handleEdit = (id) => {
  const newText = prompt("Edit the task:");
  if (newText) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }
};


    //To add task-----------------------------------------
        const addTodo = (e) => {
             e.preventDefault();
          if (newTodo.trim() === "") return;

        const newItem = {
          id: Date.now(),
          text: newTodo,
          dueDate: dueDate,
          priority: priority,
          Completed: false
        };

        const updatedTodos = [...todos, newItem];
          setTodos(updatedTodos);
          localStorage.setItem("todos", JSON.stringify(updatedTodos)); // optional

        // Reset all fields
          setNewTodo("");
          setDueDate("");
          setPriority("medium");
          setShowPopup(false);
        };


    //toggle completion---------------------------------------
    const toggleTodo = (id) =>{
        setTodos((prevTodos)=>{
            prevTodos.map((todo)=>
                todo.id === id ? {...todo, Completed:!todo.Completed} : todo
            )
        })
    }

  return (
    <div className='todo-container'>
        <form className='todo-form' onSubmit={addTodo}>
            
            <button type="button" className="todo-button" onClick={() => setShowPopup(true)}>+ Add</button>

        </form>

        {showPopup && (
  <div className="popup-overlay">
    <div className="popup-form">
      <h3>Add New Task</h3>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Task name"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="popup-buttons">
          <button className='addBtn' type="submit">Add Task</button>
          <button className='cancelBtn' type="button" onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}



       <div className="todo-list">
  
     {todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={toggleTodo}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  ))}
</div>
      
    </div>
  )
}

export default TodoList
