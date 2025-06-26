import React from "react";
import { FaTrashAlt, FaEdit, FaFlag, FaCalendar } from "react-icons/fa";

import './TodoItem.css'

function TodoItem({ todo, onDelete, onEdit, isRemoving }) {

function isDueToday(dueDate) {
  const today = new Date();
  const taskDate = new Date(dueDate);

  return (
    today.getFullYear() === taskDate.getFullYear() &&
    today.getMonth() === taskDate.getMonth() &&
    today.getDate() === taskDate.getDate()
  );
}


function isExpired(dueDate) {
  const today = new Date();
  const taskDate = new Date(dueDate);

  
  return taskDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
}



  return (
    <div className={`todo-card ${isRemoving ? "fade-out" : ""}`}>
      {isDueToday(todo.dueDate) && (
  <div className="due-today-badge">Due Today</div>

  
)}


{isExpired(todo.dueDate) && (
  <div className="expired-badge">Expired</div>
)}


        <div className="todo-content">
            <div>
                  <h3 className="todo-text">{todo.text}</h3>
                
                <div className="todo-dates">
                  <FaCalendar className="calender-icon"/>
                  <span className="todo-date">{todo.dueDate}</span>
                </div>
                
                <p className={`todo-status ${todo.completed ? "complete" : "Incomplete"}`}>
                          {todo.completed ? "complete" : "Incomplete"}
                </p>




            </div>

            
        </div>
        

        <div className="todo-actions">
            <button className="icon-button edit-btn" aria-label="Edit Todo"  onClick={()=> onEdit(todo)}><FaEdit/></button>
            <button className="icon-button delete-btn" aria-label="Delete Todo" onClick={()=> onDelete(todo.id)}><FaTrashAlt/></button>
        </div>


         <div className={`priority-badge priority-${todo.priority}`}>
        <FaFlag className="priority-icon" />
        <span className="priority-text"> {todo.priority}</span>
      </div>


    </div>
  );
}

export default TodoItem;

