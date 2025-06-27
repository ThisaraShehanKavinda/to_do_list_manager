/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList/TodoList';

jest.mock('../components/TodoItem/TodoItem', () => (props) => (
  <div
    data-testid="todo-item"
    style={{ textDecoration: props.todo.completed ? 'line-through' : 'none' }}
    onClick={() => props.onToggle(props.todo.id)}
  >
    {props.todo.text}
  </div>
));

jest.mock('../components/AddTask/AddTaskPopup', () => () => <div data-testid="add-popup">Add Popup</div>);
jest.mock('../components/EditTask/EditTaskPopup', () => () => <div data-testid="edit-popup">Edit Popup</div>);
jest.mock('../components/DeleteTask/DeleteTaskPopup', () => () => <div data-testid="delete-popup">Delete Popup</div>);
jest.mock('../components/SortControls/SortControl', () => () => <div data-testid="sort-control">SortControl</div>);
jest.mock('../components/SearchBar/SearchBar', () => () => <div data-testid="search-bar">SearchBar</div>);
jest.mock('../components/StatusFilter/StatusFilter', () => (props) => (
  <div data-testid="status-filter">
    <button onClick={() => props.setFilterStatus('Complete')}>Complete</button>
    <button onClick={() => props.setFilterStatus('Incomplete')}>Incomplete</button>
    <button onClick={() => props.setFilterStatus('All')}>All</button>
  </div>
));

jest.mock('../components/TodoItem/TodoItem', () => (props) => (
  <div data-testid="todo-item">{props.todo.text}</div>
));


jest.mock('../hooks/TodoController', () => ({
  useTodoController: () => ({
    todos: [
      { id: 1, text: 'Test Task', dueDate: '2025-06-30', completed: false, priority: 'medium' },
      { id: 2, text: 'Completed Task', dueDate: '2025-06-25', completed: true, priority: 'high' }
    ],
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
    removingId: null,

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
  const addButton = screen.getByTestId('add-button');
  expect(addButton).toBeInTheDocument();
});


  it('renders todo items', () => {
    const items = screen.getAllByTestId('todo-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Test Task');
    expect(items[1]).toHaveTextContent('Completed Task');
  });

  it('renders the popups', () => {
    expect(screen.getByTestId('add-popup')).toBeInTheDocument();
    expect(screen.getByTestId('edit-popup')).toBeInTheDocument();
    expect(screen.getByTestId('delete-popup')).toBeInTheDocument();
  });

  it('filters tasks by completion status', () => {
    // Click "Complete" to filter
    fireEvent.click(screen.getByText('Complete'));
    const completed = screen.getAllByTestId('todo-item');
    expect(completed).toHaveLength(1);
    expect(completed[0]).toHaveTextContent('Completed Task');

    // Click "Incomplete" to filter
    fireEvent.click(screen.getByText('Incomplete'));
    const incomplete = screen.getAllByTestId('todo-item');
    expect(incomplete).toHaveLength(1);
    expect(incomplete[0]).toHaveTextContent('Test Task');
  });
});
