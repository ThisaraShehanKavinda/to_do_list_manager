import React, { useEffect, useState } from "react";
import todosData from "../../data/todos.json";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import SortControl from "../SortControls/SortControl";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [showPopup, setShowPopup] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setTodos(todosData);
  }, []);

  //delete task
  const handleDelete = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== todoToDelete.id)
    );
    setShowDeleteConfirm(false);
    setTodoToDelete(null);
  };

  // Edit Task
  const handleEdit = (todo) => {
    setEditTodo({ ...todo });
    setIsEditing(true);
  };

  // Save Edited Task
  const handleUpdate = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editTodo.id ? editTodo : todo))
    );
    setIsEditing(false);
  };

  // Toggle Complete/Incomplete
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, Completed: !todo.Completed } : todo
      )
    );
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
      Completed: false,
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

  //Sort Tasks
  const sortedTodos = [...todos].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="todo-container">
      <form className="todo-form" onSubmit={addTodo}>
        
        <SortControl sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <p className="welcome-text">My To-Do List</p>
        <button
          type="button"
          className="todo-button"
          onClick={() => setShowPopup(true)}
        >
          + Add
        </button>
      </form>
      {/* This is the add Task Popup */}
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
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="popup-buttons">
                <button className="addBtn" type="submit">
                  Add Task
                </button>
                <button
                  className="cancelBtn"
                  type="button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* This is the Edit Task Popup */}
      {isEditing && editTodo && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Edit Task</h3>
            <input
              type="text"
              placeholder="Task name"
              value={editTodo.text}
              onChange={(e) =>
                setEditTodo({ ...editTodo, text: e.target.value })
              }
            />
            <input
              type="date"
              value={editTodo.dueDate}
              onChange={(e) =>
                setEditTodo({ ...editTodo, dueDate: e.target.value })
              }
            />
            <select
              value={editTodo.priority}
              onChange={(e) =>
                setEditTodo({ ...editTodo, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={editTodo.Completed ? "complete" : "incomplete"}
              onChange={(e) =>
                setEditTodo({
                  ...editTodo,
                  Completed: e.target.value === "complete",
                })
              }
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
            <div className="popup-buttons">
              <button className="addBtn" onClick={handleUpdate}>
                Update
              </button>
              <button className="cancelBtn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* This is the delete Task Popup */}
      {showDeleteConfirm && todoToDelete && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this task?</p>
            <p>
              <strong>{todoToDelete.text}</strong>
            </p>
            <div className="popup-buttons">
              <button className="addBtn" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="cancelBtn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="todo-list">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={() => handleDelete(todo)}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
