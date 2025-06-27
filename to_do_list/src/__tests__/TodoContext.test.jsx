/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoProvider, useTodoContext } from '../hooks/TodoContext'; // import them here

// TestComponent uses the context hook
const TestComponent = () => {
  const {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleTodo,
  } = useTodoContext();

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              data-testid={`todo-${todo.id}`}
              onClick={() => toggleTodo(todo.id)}
              className={todo.completed ? 'completed' : ''}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to render with provider context
const renderWithProvider = () =>
  render(
    <TodoProvider>
      <TestComponent />
    </TodoProvider>
  );

describe('TodoProvider and context integration', () => {
  test('renders initial todos from context', () => {
    renderWithProvider();

    // Make sure the todo list has some items initially
    expect(screen.getByTestId('todo-list').children.length).toBeGreaterThan(0);
  });

  test('adds a new todo', () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('New todo');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Test new todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test new todo')).toBeInTheDocument();
  });
});
