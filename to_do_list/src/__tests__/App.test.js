/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'; // adjust path if needed
import '@testing-library/jest-dom';

test('renders Header and TodoList', () => {
  render(<App />);
  
  // Adjust this based on actual text or role in Header/TodoList
  expect(screen.getByRole('banner')).toBeInTheDocument(); 
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
});
