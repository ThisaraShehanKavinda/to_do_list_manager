
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import SortControl from "../SortControls/SortControl";
import AddTaskPopup from "../AddTask/AddTaskPopup";
import EditTaskPopup from "../EditTask/EditTaskPopup";
import DeleteConfirmPopup from '../DeleteTask/DeleteTaskPopup'
import { useTodoController } from "../../hooks/TodoController";
import SearchBar from "../SearchBar/SearchBar";

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

  return (
    <div className="todo-container">

      
      <p className="welcome-text">My Tasks</p>
      <form className="todo-form" onSubmit={addTodo}>
<SearchBar className="searchbtn" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
<SortControl sortOrder={sortOrder} setSortOrder={setSortOrder} />


        <button
          type="button"
          className="todo-button"
          onClick={() => setShowPopup(true)}
        >
          + Add
        </button>
      </form>



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
