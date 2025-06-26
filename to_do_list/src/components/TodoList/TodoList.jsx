import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import SortControl from "../SortControls/SortControl";
import AddTaskPopup from "../AddTask/AddTaskPopup";
import EditTaskPopup from "../EditTask/EditTaskPopup";
import DeleteConfirmPopup from "../DeleteTask/DeleteTaskPopup";
import { useTodoController } from "../../hooks/TodoController";
import SearchBar from "../SearchBar/SearchBar";
import StatusFilter from "../StatusFilter/StatusFilter";
import { useState } from "react";
import { FaTasks, FaPlus } from "react-icons/fa";

function TodoList() {
  const {
    todos: sortedTodos,
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
  } = useTodoController();

  const [filterStatus, setFilterStatus] = useState("All");

  return (
    <div className="todo-container">
      <p className="welcome-text">My Tasks</p>

      <StatusFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <form className="todo-form" onSubmit={addTodo}>
        <SearchBar
          className="searchbtn"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <SortControl sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </form>

      <button
        type="button"
        className="add-button"
        onClick={() => setShowPopup(true)}
      >
        <FaTasks className="add-icon" />
        <span className="add-plus">
          <FaPlus />
        </span>
      </button>

      {/* This is the add Task Popup */}
      <AddTaskPopup
        showPopup={showPopup}
        newTodo={newTodo}
        dueDate={dueDate}
        priority={priority}
        setNewTodo={setNewTodo}
        setDueDate={setDueDate}
        setPriority={setPriority}
        addTodo={addTodo}
        setShowPopup={setShowPopup}
      />

      {/* This is the Edit Task Popup */}
      <EditTaskPopup
        isEditing={isEditing}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        handleUpdate={handleUpdate}
        setIsEditing={setIsEditing}
      />

      {/* This is the delete Task Popup */}
      <DeleteConfirmPopup
        showDeleteConfirm={showDeleteConfirm}
        todoToDelete={todoToDelete}
        confirmDelete={confirmDelete}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />

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
              ata-testid="todo-list"
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={() => handleDelete(todo)}
              onEdit={handleEdit}
              isRemoving={removingId === todo.id}
            />
          ))}
      </div>
    </div>
  );
}

export default TodoList;
