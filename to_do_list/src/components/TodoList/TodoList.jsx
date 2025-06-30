import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import SortControl from "../SortControls/SortControl";
import AddTaskPopup from "../AddTask/AddTaskPopup";
import EditTaskPopup from "../EditTask/EditTaskPopup";
import DeleteConfirmPopup from "../DeleteTask/DeleteTaskPopup";
import SearchBar from "../SearchBar/SearchBar";
import StatusFilter from "../StatusFilter/StatusFilter";
import { useState } from "react";
import { FaTasks, FaPlus } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import {
  setNewTodo,
  setDueDate,
  setPriority,
  setShowPopup,
  setSortOrder,
  setIsEditing,
  setEditTodo,
  setShowDeleteConfirm,
  setSearchTerm,
  addTodo,
  handleEdit,
  handleUpdate,
  handleDelete,
  confirmDelete,
  toggleTodo,
} from "../../store/todoSlice"; 

function TodoList() {
  const dispatch = useDispatch();

  const {
    items,
    newTodo,
    dueDate,
    priority,
    showPopup,
    isEditing,
    editTodo,
    showDeleteConfirm,
    todoToDelete,
    sortOrder,
    searchTerm,
    removingId,
  } = useSelector((state) => state.todos);

  const [filterStatus, setFilterStatus] = useState("All");

  // Filter & sort todos
  const sortedTodos = [...items]
    .filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="todo-container">
      <p className="welcome-text">My Tasks</p>

      <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addTodo());
        }}
      >
        <SearchBar
          className="searchbtn"
          searchTerm={searchTerm}
          setSearchTerm={(value) => dispatch(setSearchTerm(value))}
        />

        <SortControl
          sortOrder={sortOrder}
          setSortOrder={(value) => dispatch(setSortOrder(value))}
        />
      </form>

      <button
        type="button"
        className="add-button"
        data-testid="add-button"
        onClick={() => dispatch(setShowPopup(true))}
      >
        <FaTasks className="add-icon" />
        <span className="add-plus">
          <FaPlus />
        </span>
      </button>

      {/* Add Task Popup */}
      <AddTaskPopup
        showPopup={showPopup}
        newTodo={newTodo}
        dueDate={dueDate}
        priority={priority}
        setNewTodo={(value) => dispatch(setNewTodo(value))}
        setDueDate={(value) => dispatch(setDueDate(value))}
        setPriority={(value) => dispatch(setPriority(value))}
        addTodo={() => dispatch(addTodo())}
        setShowPopup={(value) => dispatch(setShowPopup(value))}
      />

      {/* Edit Task Popup */}
      <EditTaskPopup
        isEditing={isEditing}
        editTodo={editTodo}
        setEditTodo={(value) => dispatch(setEditTodo(value))}
        handleUpdate={() => dispatch(handleUpdate())}
        setIsEditing={(value) => dispatch(setIsEditing(value))}
      />

      {/* Delete Task Popup */}
      <DeleteConfirmPopup
        showDeleteConfirm={showDeleteConfirm}
        todoToDelete={todoToDelete}
        confirmDelete={() => dispatch(confirmDelete())}
        setShowDeleteConfirm={(value) => dispatch(setShowDeleteConfirm(value))}
      />

      {/* Todo List */}
      <div data-testid="todo-list" className="todo-list">
        {sortedTodos
          .filter((todo) => {
            if (filterStatus === "All") return true;
            if (filterStatus === "Complete") return todo.completed;
            if (filterStatus === "Incomplete") return !todo.completed;
            return true;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => dispatch(toggleTodo(todo.id))}
              onDelete={() => dispatch(handleDelete(todo))}
              onEdit={() => dispatch(handleEdit(todo))}
              isRemoving={removingId === todo.id}
            />
          ))}
      </div>
    </div>
  );
}

export default TodoList;
