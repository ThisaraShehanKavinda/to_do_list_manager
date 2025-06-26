/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar/SearchBar';

describe('SearchBar Component', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    render(<SearchBar searchTerm="test" setSearchTerm={mockSetSearchTerm} />);
  });

  it('renders the search input with correct value', () => {
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it('renders the search icon button', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls setSearchTerm on input change', () => {
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'new search' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('new search');
  });
});
