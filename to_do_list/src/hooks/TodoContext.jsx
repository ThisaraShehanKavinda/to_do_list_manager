import { createContext, useContext, useState, useEffect } from 'react';
import todosData from '../data/todos.json';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [removingId, setRemovingId] = useState(null);


  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    setTodos(todosData);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const newItem = {
      id: Date.now(),
      text: newTodo,
      dueDate,
      priority,
      completed: false,
    };

    setTodos([...todos, newItem]);
    setNewTodo('');
    setDueDate('');
    setPriority('medium');
    setShowPopup(false);

    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message: `New task added: "${newTodo}"` },
    ]);
    setHasNewNotification(true);
  };

  const handleEdit = (todo) => {
    setEditTodo({ ...todo });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!editTodo) return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editTodo.id ? editTodo : todo))
    );
    setIsEditing(false);
    setEditTodo(null);
  };

  const handleDelete = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!todoToDelete) return;

    setRemovingId(todoToDelete.id);

    setTimeout(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== todoToDelete.id));
      setTodoToDelete(null);
      setShowDeleteConfirm(false);
      setRemovingId(null);
    }, 300);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearNotifications = () => {
    setHasNewNotification(false);
  };

  const filteredAndSortedTodos = [...todos]
    .filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <TodoContext.Provider
      value={{
        todos: filteredAndSortedTodos,
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
        notifications,
        hasNewNotification,

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
        clearNotifications,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
