// EditTaskPopup.js
import React from 'react';

const EditTaskPopup = ({
  isEditing,
  editTodo,
  setEditTodo,
  handleUpdate,
  setIsEditing
}) => {
  if (!isEditing || !editTodo) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h3>Edit Task</h3>
        <input
          type="text"
          placeholder="Task name"
          value={editTodo.text || ''}
          onChange={(e) =>
            setEditTodo({ ...editTodo, text: e.target.value })
          }
        />
        <input
          type="date"
          value={editTodo.dueDate || ""}
          onChange={(e) =>
            setEditTodo({ ...editTodo, dueDate: e.target.value })
          }
        />
        <select
          value={editTodo.priority || "low"}
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
          <button
            className="cancelBtn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPopup;
