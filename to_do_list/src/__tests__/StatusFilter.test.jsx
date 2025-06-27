/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatusFilter from "../components/StatusFilter/StatusFilter";
import "@testing-library/jest-dom";


describe("StatusFilter component", () => {
  const statuses = ["All", "Complete", "Incomplete"];

  test("renders all filter buttons", () => {
    render(<StatusFilter filterStatus="All" setFilterStatus={() => {}} />);
    statuses.forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  test("adds active class to the selected filter", () => {
    render(<StatusFilter filterStatus="Complete" setFilterStatus={() => {}} />);
    const activeButton = screen.getByText("Complete");
    expect(activeButton).toHaveClass("active");
  });

  test("calls setFilterStatus with correct status on button click", () => {
    const mockSetFilterStatus = jest.fn();
    render(
      <StatusFilter filterStatus="All" setFilterStatus={mockSetFilterStatus} />
    );

    const incompleteButton = screen.getByText("Incomplete");
    fireEvent.click(incompleteButton);

    expect(mockSetFilterStatus).toHaveBeenCalledWith("Incomplete");
  });
});
