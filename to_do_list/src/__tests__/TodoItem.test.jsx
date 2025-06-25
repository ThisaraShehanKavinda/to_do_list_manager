/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem/TodoItem';

describe('TodoItem Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const todo = {
    id: 1,
    text: 'Test Todo Item',
    dueDate: '2025-06-30',
    priority: 'high',
    completed: false,
  };

  beforeEach(() => {
    render(<TodoItem todo={todo} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
  });

  it('renders todo text', () => {
    expect(screen.getByText(/test todo item/i)).toBeInTheDocument();
  });

  it('renders due date', () => {
    expect(screen.getByText('2025-06-30')).toBeInTheDocument();
  });

  it('displays the correct status', () => {
    expect(screen.getByText(/incomplete/i)).toBeInTheDocument();
  });

  it('shows the correct priority', () => {
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const editBtn = screen.getByRole('button', { name: /edit todo/i }) 
    fireEvent.click(editBtn);
    expect(mockOnEdit).toHaveBeenCalledWith(todo);
  });

  it('calls onDelete when Delete button is clicked', () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); 
    expect(mockOnDelete).toHaveBeenCalledWith(todo.id);
  });
});
