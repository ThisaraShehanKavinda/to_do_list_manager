/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList/TodoList';


jest.mock('../components/TodoItem/TodoItem', () => (props) => (
  <div data-testid="todo-item">{props.todo.text}</div>
));
jest.mock('../components/AddTask/AddTaskPopup', () => () => <div data-testid="add-popup">Add Popup</div>);
jest.mock('../components/EditTask/EditTaskPopup', () => () => <div data-testid="edit-popup">Edit Popup</div>);
jest.mock('../components/DeleteTask/DeleteTaskPopup', () => () => <div data-testid="delete-popup">Delete Popup</div>);
jest.mock('../components/SortControls/SortControl', () => () => <div data-testid="sort-control">SortControl</div>);
jest.mock('../components/SearchBar/SearchBar', () => () => <div data-testid="search-bar">SearchBar</div>);


jest.mock('../Hooks/TodoController', () => ({
  useTodoController: () => ({
    todos: [{ id: 1, text: 'Test Task', dueDate: '2025-06-30', completed: false, priority: 'medium' }],
    newTodo: '',
    dueDate: '',
    priority: '',
    showPopup: false,
    isEditing: false,
    editTodo: null,
    showDeleteConfirm: false,
    todoToDelete: null,
    sortOrder: 'asc',
    searchTerm: '',
    setNewTodo: jest.fn(),
    setDueDate: jest.fn(),
    setPriority: jest.fn(),
    setShowPopup: jest.fn(),
    setSortOrder: jest.fn(),
    setIsEditing: jest.fn(),
    setEditTodo: jest.fn(),
    setShowDeleteConfirm: jest.fn(),
    setSearchTerm: jest.fn(),
    addTodo: jest.fn((e) => e.preventDefault()),
    handleEdit: jest.fn(),
    handleUpdate: jest.fn(),
    handleDelete: jest.fn(),
    confirmDelete: jest.fn(),
    toggleTodo: jest.fn(),
  }),
}));

describe('TodoList Component', () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  it('renders header text', () => {
    expect(screen.getByText(/my tasks/i)).toBeInTheDocument();
  });

  it('renders the search bar and sort control', () => {
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('sort-control')).toBeInTheDocument();
  });

  it('renders the Add button', () => {
    expect(screen.getByRole('button', { name: /\+ add/i })).toBeInTheDocument();
  });

  it('renders a todo item', () => {
    expect(screen.getByTestId('todo-item')).toHaveTextContent('Test Task');
  });

  it('renders the popups', () => {
    expect(screen.getByTestId('add-popup')).toBeInTheDocument();
    expect(screen.getByTestId('edit-popup')).toBeInTheDocument();
    expect(screen.getByTestId('delete-popup')).toBeInTheDocument();
  });
});
