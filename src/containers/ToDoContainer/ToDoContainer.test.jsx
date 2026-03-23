import { expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToDoContainer from "./ToDoContainer";
test("checks ToDoContainer exists", () => {
    render(<ToDoContainer />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
});

//TODO: test if resetting functions and other functionality once flow is complete
test("check if clicking reset button removes ToDoItems", async () => {
    render(<ToDoContainer />);
    // Add an item first to make list non-empty
    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
    await screen.findByRole("paragraph", { value: "New Task" });
    // Click reset
    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);
    await waitFor(() => {
        expect(screen.queryByText("New Task")).not.toBeInTheDocument();
    });
});
