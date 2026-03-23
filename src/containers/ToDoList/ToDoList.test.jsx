import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ToDoList from "./ToDoList";

test("Check if ToDoList renders", () => {
    render(
        <ToDoList>
            <p>Test Todo</p>
        </ToDoList>
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
});
