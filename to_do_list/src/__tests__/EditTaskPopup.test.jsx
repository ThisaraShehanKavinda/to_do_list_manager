/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import EditTaskPopup from '../components/EditTask/EditTaskPopup';

describe('EditTaskPopup Component', () => {
  const mockSetEditTodo = jest.fn();
  const mockHandleUpdate = jest.fn();
  const mockSetIsEditing = jest.fn();

  const editTodo = {
    text: 'Test Task',
    dueDate: '2025-07-01',
    priority: 'medium',
    completed: false,
  };

  beforeEach(() => {
    render(
      <EditTaskPopup
        isEditing={true}
        editTodo={editTodo}
        setEditTodo={mockSetEditTodo}
        handleUpdate={mockHandleUpdate}
        setIsEditing={mockSetIsEditing}
      />
    );
  });

it('renders with pre-filled data', () => {
  expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  expect(screen.getByDisplayValue('2025-07-01')).toBeInTheDocument();


  const prioritySelect = screen.getAllByRole('combobox')[0];
  expect(prioritySelect.value).toBe('medium');
  const statusSelect = screen.getAllByRole('combobox')[1];
  expect(statusSelect.value).toBe('Incomplete');
});


  it('calls setEditTodo on text input change', () => {
    const input = screen.getByPlaceholderText('Task name');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    expect(mockSetEditTodo).toHaveBeenCalledWith({
      ...editTodo,
      text: 'Updated Task',
    });
  });

  it('calls setEditTodo on due date change', () => {
    const dateInput = screen.getByDisplayValue('2025-07-01');
    fireEvent.change(dateInput, { target: { value: '2025-08-01' } });
    expect(mockSetEditTodo).toHaveBeenCalledWith({
      ...editTodo,
      dueDate: '2025-08-01',
    });
  });

  it('calls handleUpdate on Update button click', () => {
    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);
    expect(mockHandleUpdate).toHaveBeenCalled();
  });

  it('calls setIsEditing(false) on Cancel button click', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });
});
