/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTaskPopup from "../components/AddTask/AddTaskPopup";

// Mock functions for props
const mockSetNewTodo = jest.fn();
const mockSetDueDate = jest.fn();
const mockSetPriority = jest.fn();
const mockAddTodo = jest.fn();
const mockSetShowPopup = jest.fn();

const defaultProps = {
  showPopup: true,
  setNewTodo: mockSetNewTodo,
  setDueDate: mockSetDueDate,
  setPriority: mockSetPriority,
  addTodo: mockAddTodo,
  setShowPopup: mockSetShowPopup,
  newTodo: '',
  dueDate: '',
  priority: 'low',
};

// Mock form submit to prevent jsdom error
beforeAll(() => {
  HTMLFormElement.prototype.submit = () => {};
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("AddTaskPopup", () => {
  test("renders the popup when showPopup is true", () => {
    render(<AddTaskPopup {...defaultProps} />);
    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument();
  });

  test("does not render the popup when showPopup is false", () => {
    render(<AddTaskPopup {...defaultProps} showPopup={false} />);
    expect(screen.queryByText(/Add New Task/i)).not.toBeInTheDocument();
  });

  test("calls setNewTodo on task name input change", () => {
    render(<AddTaskPopup {...defaultProps} />);
    const input = screen.getByPlaceholderText("Task name");
    fireEvent.change(input, { target: { value: "Test task" } });
    expect(mockSetNewTodo).toHaveBeenCalledWith("Test task");
  });

  test("calls setDueDate on date input change", () => {
    render(<AddTaskPopup {...defaultProps} />);
    
  });

  // Alternative approach for date input if no label:
  test("calls setDueDate on date input change (alternative)", () => {
    render(<AddTaskPopup {...defaultProps} />);
    const dateInput = screen.getByTestId("due-date-input");
    fireEvent.change(dateInput, { target: { value: "2025-07-01" } });
    expect(mockSetDueDate).toHaveBeenCalledWith("2025-07-01");
  });

  test("calls setPriority on priority select change", () => {
    render(<AddTaskPopup {...defaultProps} />);
    const prioritySelect = screen.getByLabelText(/priority/i);
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    expect(mockSetPriority).toHaveBeenCalledWith("high");
  });

  test("calls addTodo when Add Task button is clicked", () => {
    render(<AddTaskPopup {...defaultProps} />);
    const button = screen.getByText(/Add Task/i);
    fireEvent.click(button);
    expect(mockAddTodo).toHaveBeenCalled();
  });

  test("calls setShowPopup(false) when Cancel button is clicked", () => {
    render(<AddTaskPopup {...defaultProps} />);
    const cancelBtn = screen.getByText(/Cancel/i);
    fireEvent.click(cancelBtn);
    expect(mockSetShowPopup).toHaveBeenCalledWith(false);
  });
});
