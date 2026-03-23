import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ToDoContainer from "./ToDoContainer";
test("checks ToDoContainer exists", () => {
    render(<ToDoContainer />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
});

//TODO: test if resetting functions and other functionality once flow is complete
