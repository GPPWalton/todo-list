import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
