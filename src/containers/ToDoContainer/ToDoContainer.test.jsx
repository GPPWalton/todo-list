import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoContainer from "./ToDoContainer";
test("checks ToDoContainer exists", () => {
    render(<ToDoContainer />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
});

test("checks if add button is disabled when input is empty", () => {
    render(<ToDoContainer />);
    const add_button = screen.getByRole("button", { name: "Add" });
    expect(add_button).toBeDisabled();
});
test("should delete the correct ToDoItem when delete button is clicked", async () => {
    render(<ToDoContainer />);

    const user = userEvent.setup();

    // Add two todo items
    const input = screen.getByRole("textbox"); // Adjust selector if needed
    const addButton = screen.getByRole("button", { name: "Add" });

    await user.type(input, "First task");
    await user.click(addButton);

    await user.type(input, "Second task");
    await user.click(addButton);

    // Check both items are present
    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();

    // Find and click delete button for "First task"
    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[0]); // Delete first item

    // Assert only second item remains
    expect(screen.queryByText("First task")).not.toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
});
