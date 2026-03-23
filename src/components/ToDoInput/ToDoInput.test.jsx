import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ToDoInput from "./ToDoInput";

test("Check if ToDoInput component renders", () => {
    render(<ToDoInput onAdd={vi.fn()} onInput={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
});
