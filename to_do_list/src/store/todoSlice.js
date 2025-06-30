import { createSlice } from '@reduxjs/toolkit';



const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    newTodo: '',
    dueDate: '',
    priority: 'medium',
    showPopup: false,
    isEditing: false,
    editTodo: null,
    showDeleteConfirm: false,
    todoToDelete: null,
    sortOrder: 'asc',
    searchTerm: '',
    removingId: null,
    notifications: [],
    hasNewNotification: false,
  },
  reducers: {
    setNewTodo: (state, action) => {
      state.newTodo = action.payload;
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    addTodo: (state) => {
      if (state.newTodo.trim() === '') return;
      const newTask = {
        id: Date.now(),
        text: state.newTodo,
        dueDate: state.dueDate,
        priority: state.priority,
        completed: false,
      };
      state.items.push(newTask);
      state.newTodo = '';
      state.dueDate = '';
      state.priority = 'medium';
      state.showPopup = false;
      state.notifications.push({
        id: Date.now(),
        message: `New task added: "${newTask.text}"`,
      });
      state.hasNewNotification = true;
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    handleEdit: (state, action) => {
      state.editTodo = { ...action.payload };
      state.isEditing = true;
    },
    handleUpdate: (state) => {
      const index = state.items.findIndex((t) => t.id === state.editTodo.id);
      if (index !== -1) {
        state.items[index] = state.editTodo;
      }
      state.editTodo = null;
      state.isEditing = false;
    },
    handleDelete: (state, action) => {
      state.todoToDelete = action.payload;
      state.showDeleteConfirm = true;
    },
    confirmDelete: (state) => {
      state.items = state.items.filter((t) => t.id !== state.todoToDelete.id);
      state.todoToDelete = null;
      state.showDeleteConfirm = false;
    },
    clearNotifications: (state) => {
      state.hasNewNotification = false;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setNewTodo,
  setDueDate,
  setPriority,
  setSearchTerm,
  setShowPopup,
  addTodo,
  toggleTodo,
  handleEdit,
  handleUpdate,
  handleDelete,
  confirmDelete,
  clearNotifications,
  setSortOrder,
} = todoSlice.actions;

export default todoSlice.reducer;