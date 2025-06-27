import React from 'react';
import { useTodoContext } from '../hooks/TodoContext';


import TodoItem from '../components/TodoItem/TodoItem';
import AddTaskPopup from '../components/AddTask/AddTaskPopup';
import EditTaskPopup from '../components/EditTask/EditTaskPopup';
import DeleteTaskPopup from '../components/DeleteTask/DeleteTaskPopup';
import SortControl from '../components/SortControls/SortControl';
import SearchBar from '../components/SearchBar/SearchBar';
import StatusFilter from '../components/StatusFilter/StatusFilter';

const TodoList = () => {
  const {
    todos,
    showPopup,
    isEditing,
    showDeleteConfirm,
    setShowPopup,
    setSearchTerm,
    setSortOrder,
    sortOrder,
    searchTerm,
    handleEdit,
    handleDelete,
    toggleTodo,
  } = useTodoContext();

  const [filterStatus, setFilterStatus] = React.useState('All');

  // Filter todos by completion status
  const filteredByStatus = todos.filter(todo => {
    if (filterStatus === 'Complete') return todo.completed;
    if (filterStatus === 'Incomplete') return !todo.completed;
    return true; // 'All'
  });

  return (
    <div>
      <h1>My Tasks</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortControl sortOrder={sortOrder} setSortOrder={setSortOrder} />
      
      <StatusFilter setFilterStatus={setFilterStatus} />

      <button onClick={() => setShowPopup(true)}>Add</button>

      <ul>
        {filteredByStatus.length === 0 && <li>No tasks found.</li>}

        {filteredByStatus.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onEdit={() => handleEdit(todo)}
            onDelete={() => handleDelete(todo)}
          />
        ))}
      </ul>

      {showPopup && <AddTaskPopup />}
      {isEditing && <EditTaskPopup />}
      {showDeleteConfirm && <DeleteTaskPopup />}
    </div>
  );
};

export default TodoList;
