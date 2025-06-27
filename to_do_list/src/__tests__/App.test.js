/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'; 
import '@testing-library/jest-dom';

test('renders Header and TodoList', () => {
  render(<App />);
  
 
  expect(screen.getByRole('banner')).toBeInTheDocument(); 
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
});
