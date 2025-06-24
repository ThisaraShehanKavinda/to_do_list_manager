// AddTaskPopup.js
import React from 'react';

const AddTaskPopup = ({
  showPopup,
  newTodo,
  dueDate,
  priority,
  setNewTodo,
  setDueDate,
  setPriority,
  addTodo,
  setShowPopup
}) => {
  if (!showPopup) return null;

  return (
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
  );
};

export default AddTaskPopup;
