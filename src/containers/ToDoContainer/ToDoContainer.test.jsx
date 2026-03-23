import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
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
