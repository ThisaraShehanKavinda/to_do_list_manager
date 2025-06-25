/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortControl from '../components/SortControls/SortControl';

describe('SortControl Component', () => {
  const mockSetSortOrder = jest.fn();

  beforeEach(() => {
    render(<SortControl sortOrder="asc" setSortOrder={mockSetSortOrder} />);
  });

  it('renders the label', () => {
    const label = screen.getByText(/sort for due date/i);
    expect(label).toBeInTheDocument();
  });

  it('renders the select element with correct value', () => {
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('asc');
  });

  it('calls setSortOrder when selection changes', () => {
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'desc' } });
    expect(mockSetSortOrder).toHaveBeenCalledWith('desc');
  });
});
