import React from "react";
import { FaTrashAlt, FaEdit, FaFlag, FaCalendar } from "react-icons/fa";

import './TodoItem.css'

function TodoItem({ todo, onDelete, onEdit }) {
  return (
    <div className="todo-card">
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

