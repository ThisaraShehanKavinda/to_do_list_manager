/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmPopup from '../components/DeleteTask/DeleteTaskPopup';

describe('DeleteConfirmPopup', () => {
  const mockConfirmDelete = jest.fn();
  const mockSetShowDeleteConfirm = jest.fn();

  const defaultProps = {
    showDeleteConfirm: true,
    todoToDelete: { text: 'Test task' },
    confirmDelete: mockConfirmDelete,
    setShowDeleteConfirm: mockSetShowDeleteConfirm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when showDeleteConfirm is false', () => {
    const { container } = render(
      <DeleteConfirmPopup
        {...defaultProps}
        showDeleteConfirm={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('does not render when todoToDelete is null', () => {
    const { container } = render(
      <DeleteConfirmPopup
        {...defaultProps}
        todoToDelete={null}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders and displays todo text', () => {
    render(<DeleteConfirmPopup {...defaultProps} />);
    expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  test('calls confirmDelete when "Delete" button is clicked', () => {
    render(<DeleteConfirmPopup {...defaultProps} />);
    const yesButton = screen.getByText(/yes, delete/i);
    fireEvent.click(yesButton);
    expect(mockConfirmDelete).toHaveBeenCalledTimes(1);
  });

  test('calls setShowDeleteConfirm(false) when "Cancel" button is clicked', () => {
    render(<DeleteConfirmPopup {...defaultProps} />);
    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    expect(mockSetShowDeleteConfirm).toHaveBeenCalledWith(false);
  });
});
