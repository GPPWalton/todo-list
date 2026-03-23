import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ResetButton from "./ResetButton";

test("renders button", () => {
    render(<ResetButton />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
});
