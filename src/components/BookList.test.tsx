import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import BookList from "./BookList";

afterEach(() => {
  cleanup();
});

describe("BookList", () => {
  it("renders the populated book list", () => {
    render(<BookList />);

    expect(
      screen.getByRole("heading", { name: "Book List" }),
    ).toBeInTheDocument();
    expect(screen.getByText("4 books found")).toBeInTheDocument();
    expect(screen.getByText("Eloquent JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Learning React")).toBeInTheDocument();
  });

  it("filters books by title", async () => {
    const user = userEvent.setup();

    render(<BookList />);

    await user.type(screen.getByLabelText("Filter by title"), "react");

    expect(screen.getByText("1 books found")).toBeInTheDocument();
    expect(screen.getByText("Learning React")).toBeInTheDocument();
    expect(screen.queryByText("Eloquent JavaScript")).not.toBeInTheDocument();
  });

  it("renders the empty state when no books match", async () => {
    const user = userEvent.setup();

    render(<BookList />);

    await user.type(screen.getByLabelText("Filter by title"), "python");

    expect(screen.getByText("0 books found")).toBeInTheDocument();
    expect(screen.getByText("No books match your filter.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders the loading state", async () => {
    const user = userEvent.setup();

    render(<BookList />);

    await user.click(screen.getByRole("button", { name: "Loading" }));

    expect(screen.getByText("Loading books...")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders the error state", async () => {
    const user = userEvent.setup();

    render(<BookList />);

    await user.click(screen.getByRole("button", { name: "Error" }));

    expect(
      screen.getByText("Unable to load books. Try again later."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
