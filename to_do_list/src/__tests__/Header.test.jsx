/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header/Header';
import { TodoProvider } from '../hooks/TodoContext';

describe('Header Component', () => {
  beforeEach(() => {
    render(
    <TodoProvider>
    <Header />
  </TodoProvider>
  );
  });

  it('renders the logo image', () => {
    const logo = screen.getByAltText(/to-do logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('displays the title text', () => {
    const title = screen.getByText(/to-do list manager/i);
    expect(title).toBeInTheDocument();
  });

  it('renders the Profile button with icon', () => {
    const profileBtn = screen.getByRole('button', { name: /profile/i });
    expect(profileBtn).toBeInTheDocument();
  });

  it('renders the Logout button with icon', () => {
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();
  });
});
