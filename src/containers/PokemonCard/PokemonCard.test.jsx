import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

test("PokemonCard renders correctly", () => {
    render(<PokemonCard />);
    expect(screen.getByText("No.")).toBeInTheDocument();
});
test("handles missing sprites correctly", async () => {
    render(<PokemonCard />);

    await waitFor(() => {
        const sprites = screen.getAllByRole("img");
        expect(sprites.length).toBe(2); // Only front_default and back_default exist
    });
});
