import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
const mockImgArr = ["image1.jpg", "image2.jpg", "image3.jpg"];

test("renders the current image", () => {
    render(<Carousel imgArr={mockImgArr} name='test' />);
    const img = screen.getByAltText("test");
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("image1.jpg");
});

test("navigates to next image when right button is clicked", () => {
    render(<Carousel imgArr={mockImgArr} name='test' />);
    const nextBtn = screen.getByLabelText("Next Image");
    fireEvent.click(nextBtn);
    expect(screen.getByAltText("test").src).toContain("image2.jpg");
});

test("navigates to previous image when left button is clicked", () => {
    render(<Carousel imgArr={mockImgArr} name='test' />);
    const prevBtn = screen.getByLabelText("Previous Image");
    fireEvent.click(prevBtn);
    expect(screen.getByAltText("test").src).toContain("image3.jpg"); // wraps from 0 to 2
});

test("wraps around to first image after last", () => {
    render(<Carousel imgArr={mockImgArr} name='test' />);
    const nextBtn = screen.getByLabelText("Next Image");
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn); // cycle through all
    expect(screen.getByAltText("test").src).toContain("image1.jpg");
});

test("does not render image if imgArr is empty or null", () => {
    render(<Carousel imgArr={null} name='test' />);
    const img = screen.queryByAltText("test");
    expect(img).not.toBeInTheDocument();
});

test("has accessible navigation buttons", () => {
    render(<Carousel imgArr={mockImgArr} name='test' />);
    expect(screen.getByLabelText("Previous Image")).toBeInTheDocument();
    expect(screen.getByLabelText("Next Image")).toBeInTheDocument();
});
