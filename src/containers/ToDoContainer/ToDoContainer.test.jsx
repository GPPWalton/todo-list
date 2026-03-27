import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoContainer from "./ToDoContainer";

beforeEach(() => {
    // Mock the initial GET request on mount
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]) // Mock empty list
        })
    );
});

afterEach(() => {
    vi.clearAllMocks();
});

test("checks ToDoContainer exists", async () => {
    render(<ToDoContainer />);
    // Wait for the async fetch and render
    await waitFor(() => expect(screen.getByText("Reset")).toBeInTheDocument());
});

test("checks if add button is disabled when input is empty", async () => {
    render(<ToDoContainer />);
    const addButton = await waitFor(() =>
        screen.getByRole("button", { name: "Add" })
    );
    expect(addButton).toBeDisabled();
});

test("should delete the correct ToDoItem when delete button is clicked", async () => {
    render(<ToDoContainer />);
    const user = userEvent.setup();

    // Mock the POST request for adding items
    global.fetch = vi
        .fn()
        .mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve("Task added") // Add the 'text' method
            })
        )
        // Mock the DELETE request for deleting items
        .mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve("Task deleted") // Add the 'text' method
            })
        );

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "Add" });

    await user.type(input, "First task");
    await user.click(addButton);

    await user.type(input, "Second task");
    await user.click(addButton);

    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[0]);

    expect(screen.queryByText("First task")).not.toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
});

test("should toggle completion status when checkbox is clicked", async () => {
    render(<ToDoContainer />);
    const user = userEvent.setup();

    // Mock the POST request for adding the item
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            text: () => Promise.resolve("Task added") // Add the 'text' method
        })
    );

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "Add" });

    await user.type(input, "Some task");
    await user.click(addButton);

    // Wait for the state update from the optimistic update and the fetch
    await waitFor(() => {
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        return checkbox;
    });

    const checkbox = screen.getByRole("checkbox");
    const text = screen.getByText("Some task");

    expect(checkbox).not.toBeChecked();
    expect(text).not.toHaveClass("todo-item__complete");

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(text).toHaveClass("todo-item__complete");

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(text).not.toHaveClass("todo-item__complete");
});
