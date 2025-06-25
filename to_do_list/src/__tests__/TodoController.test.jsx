/* eslint-disable no-undef */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTodoController } from "../hooks/TodoController";

// Helper component to test the hook and expose needed functions/UI
function HookWrapper() {
  const {
    todos,
    newTodo,
    dueDate,
    priority,
    showPopup,
    isEditing,
    editTodo,
    showDeleteConfirm,
    todoToDelete,
    sortOrder,
    searchTerm,

    setNewTodo,
    setDueDate,
    setPriority,
    setShowPopup,
    setSortOrder,
    setEditTodo,
    setShowDeleteConfirm,
    setSearchTerm,

    addTodo,
    handleEdit,
    handleUpdate,
    handleDelete,
    confirmDelete,
    toggleTodo,
  } = useTodoController();

  return (
    <>
      <input
        aria-label="new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        aria-label="due date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        aria-label="search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        aria-label="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={addTodo}>Add Todo</button>

      <button
        onClick={() => setShowPopup(!showPopup)}
        aria-label="toggle popup"
      >
        Toggle Popup
      </button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            aria-label={`todo-item-${todo.text}`}
          >
            {todo.text}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo)}>Delete</button>
          </li>
        ))}
      </ul>

      {isEditing && (
        <>
          <input
            aria-label="edit todo text"
            value={editTodo.text}
            onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      )}

      {showDeleteConfirm && (
        <>
          <p>Confirm delete: {todoToDelete?.text}</p>
          <button onClick={confirmDelete}>Yes, delete</button>
          <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </>
      )}

      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Toggle Sort Order (Current: {sortOrder})
      </button>
    </>
  );
}

describe("useTodoController Hook", () => {
  test("loads initial todos from data", () => {
    render(<HookWrapper />);
    // Check if initial todos exist from todosData (non-empty)
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems.length).toBeGreaterThan(0);
  });

  test("adds a new todo correctly and resets inputs", () => {
    render(<HookWrapper />);
    const input = screen.getByLabelText("new todo");
    const dueDateInput = screen.getByLabelText("due date");
    const prioritySelect = screen.getByLabelText("priority");
    const addButton = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.change(dueDateInput, { target: { value: "2025-12-31" } });
    fireEvent.change(prioritySelect, { target: { value: "high" } });

    expect(input.value).toBe("New Task");
    expect(dueDateInput.value).toBe("2025-12-31");
    expect(prioritySelect.value).toBe("high");

    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();

    // Inputs reset
    expect(input.value).toBe("");
    expect(dueDateInput.value).toBe("");
    expect(prioritySelect.value).toBe("medium");
  });

  test("does not add todo if text is empty", () => {
    render(<HookWrapper />);
    const addButton = screen.getByText("Add Todo");
    const initialCount = screen.getAllByRole("listitem").length;

    fireEvent.click(addButton);

    const newCount = screen.getAllByRole("listitem").length;
    expect(newCount).toBe(initialCount);
  });

  test("toggles todo completion state", () => {
    render(<HookWrapper />);
    const firstTodo = screen.getAllByRole("listitem")[0];
    expect(firstTodo).toHaveStyle("text-decoration: none");

    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveStyle("text-decoration: line-through");

    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveStyle("text-decoration: none");
  });

  test("edits a todo item", () => {
    render(<HookWrapper />);
    const firstTodo = screen.getAllByRole("listitem")[0];
    const editButton = screen.getAllByText("Edit")[0];

    fireEvent.click(editButton);

    const editInput = screen.getByLabelText("edit todo text");
    expect(editInput.value).toBe(
      firstTodo.textContent.replace("EditDelete", "")
    );

    fireEvent.change(editInput, { target: { value: "Updated Task" } });

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });

  test("deletes a todo item after confirmation", () => {
    render(<HookWrapper />);
    const firstTodoText = screen
      .getAllByRole("listitem")[0]
      .textContent.replace("EditDelete", "");
    const deleteButton = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteButton);

    expect(
      screen.getByText(`Confirm delete: ${firstTodoText}`)
    ).toBeInTheDocument();

    const confirmButton = screen.getByText("Yes, delete");
    fireEvent.click(confirmButton);

    expect(screen.queryByText(firstTodoText)).not.toBeInTheDocument();
  });

  test("cancels delete confirmation", () => {
    render(<HookWrapper />);
    const deleteButton = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteButton);
    expect(screen.getByText(/Confirm delete/i)).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Confirm delete/i)).not.toBeInTheDocument();
  });

  test("filters todos based on search term", () => {
    render(<HookWrapper />);
    const searchInput = screen.getByLabelText("search todos");
    fireEvent.change(searchInput, { target: { value: "non-matching-text" } });

    const filteredItems = screen.queryAllByRole("listitem");
    expect(filteredItems.length).toBe(0);
  });

  test("sorts todos by due date ascending and descending", () => {
    render(<HookWrapper />);
    const toggleSortButton = screen.getByText(/Toggle Sort Order/i);

    // Initially ascending
    let todos = screen.getAllByRole("listitem");
    let dates = todos.map((todo) => todo.textContent);
    // Just checking order changed on toggle

    fireEvent.click(toggleSortButton);

    // Now descending
    const todosDesc = screen.getAllByRole("listitem");
    const datesDesc = todosDesc.map((todo) => todo.textContent);

    expect(dates).not.toEqual(datesDesc);
  });
});



