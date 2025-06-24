import { useState, useEffect } from 'react';
import todosData from "../data/todos.json";

export const useTodoController = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [sortOrder, setSortOrder] = useState('asc');

  // Load from localStorage
  useEffect(() => {
    
    setTodos(todosData);
  }, []);



  // Add Todo
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const newItem = {
      id: Date.now(),
      text: newTodo,
      dueDate,
      priority,
      Completed: false,
    };

    setTodos([...todos, newItem]);
    setNewTodo('');
    setDueDate('');
    setPriority('medium');
    setShowPopup(false);
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setEditTodo({ ...todo });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === editTodo.id ? editTodo : todo))
    );
    setIsEditing(false);
  };

  // Delete Todo
  const handleDelete = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoToDelete.id));
    setTodoToDelete(null);
    setShowDeleteConfirm(false);
  };

  // Toggle Completion
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, Completed: !todo.Completed } : todo
      )
    );
  };

  // Sort
  const sortedTodos = [...todos].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return {
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

    setNewTodo,
    setDueDate,
    setPriority,
    setShowPopup,
    setSortOrder,
    setIsEditing,
    setEditTodo,
    setShowDeleteConfirm,

    addTodo,
    handleEdit,
    handleUpdate,
    handleDelete,
    confirmDelete,
    toggleTodo,
  };
};
