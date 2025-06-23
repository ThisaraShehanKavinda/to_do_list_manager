import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import './TodoItem.css'

function TodoItem({ todo, onDelete, onEdit }) {
  return (
    <div className="todo-card">
        <div className="todo-content">
            <div>
                <h3 className="todo-text">{todo.text}</h3>
                <p className="todo-status">
                    Status:{todo.completed ? "Complete" : "Incomplete"}
                </p>
            </div>
        </div>

        <div className="todo-actions">
            <button className="icon-button edit-btn" onClick={()=> onEdit(todo.id)}><FaEdit/></button>
            <button className="icon-button delete-btn" onClick={()=> onDelete(todo.id)}><FaTrashAlt/></button>
        </div>
    </div>
  );
}

export default TodoItem;

