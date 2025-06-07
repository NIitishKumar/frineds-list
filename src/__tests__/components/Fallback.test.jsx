import React from "react";
import { render, screen } from "@testing-library/react";
import Fallback from "../../components/Fallback";
import "@testing-library/jest-dom";

describe("Fallback Component", () => {
  it("renders correctly for 'favorites' tab with no search term", () => {
    render(<Fallback activeTab="favorites" searchTerm="" />);

    expect(screen.getByText("No favorite friends yet")).toBeInTheDocument();
    expect(screen.getByText("Star some friends to add them to favorites")).toBeInTheDocument();
  });

  it("renders correctly for 'all friends' tab with no search term", () => {
    render(<Fallback activeTab="all" searchTerm="" />);

    expect(screen.getByText("No friends yet")).toBeInTheDocument();
    expect(screen.getByText("Add some friends to get started")).toBeInTheDocument();
  });

  it("renders correctly when searchTerm is present", () => {
    render(<Fallback activeTab="favorites" searchTerm="john" />);

    expect(screen.getByText("No friends found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search terms")).toBeInTheDocument();
  });
});
