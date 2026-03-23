import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ToDoItem from "./ToDoItem";

test("Check if ToDoInput component renders", () => {
    const data = "New Task";
    const id = 0;
    render(<ToDoItem taskData={data} index={id} handleDelete={vi.fn()} />);
    expect(screen.getByText("New Task")).toBeInTheDocument();

    const checkBox = screen.getByRole("checkbox");
    expect(checkBox).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();
});

test("should toggle completion status when checkbox is clicked", () => {
    const mockHandleDelete = vi.fn();
    const taskData = "Learn React";
    render(
        <ToDoItem
            taskData={taskData}
            index={0}
            handleDelete={mockHandleDelete}
        />
    );

    const checkbox = screen.getByRole("checkbox");
    const text = screen.getByText(taskData);

    // Initially, the task should not have the "complete" class
    expect(text).not.toHaveClass("todo-item__complete");

    // Click the checkbox
    fireEvent.click(checkbox);

    // Now it should have the class
    expect(text).toHaveClass("todo-item__complete");

    // Click again to uncheck
    fireEvent.click(checkbox);

    // Class should be removed
    expect(text).not.toHaveClass("todo-item__complete");
});
