import { useCallback, useMemo, useState } from "react";
import BookListItem from "./BookListItem";
import FilterInput from "./FilterInput";
import type { Book } from "../types";

const books: Book[] = [
  {
    id: 1,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    isbn: "978-1593279509",
  },
  {
    id: 2,
    title: "Learning React",
    author: "Alex Banks and Eve Porcello",
    isbn: "978-1492051725",
  },
  {
    id: 3,
    title: "You Do Not Know JS Yet",
    author: "Kyle Simpson",
    isbn: "978-1091210092",
  },
  {
    id: 4,
    title: "Refactoring UI",
    author: "Adam Wathan and Steve Schoger",
    isbn: "978-1732895802",
  },
];

type BookListStatus = "loaded" | "loading" | "error";

function BookList() {
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<BookListStatus>("loaded");

  const handleFilterChange = useCallback((value: string) => {
    setFilterText(value);
  }, []);

  const filteredBooks = useMemo(() => {
    const normalizedFilter = filterText.trim().toLowerCase();

    if (normalizedFilter.length === 0) {
      return books;
    }

    return books.filter((book) =>
      book.title.toLowerCase().includes(normalizedFilter),
    );
  }, [filterText]);

  return (
    <section className="book-list" aria-labelledby="book-list-title">
      <div className="book-list__header">
        <div>
          <h1 id="book-list-title">Book List</h1>
          <p>{filteredBooks.length} books found</p>
        </div>

        <div className="book-list__status-controls" aria-label="List status">
          <button type="button" onClick={() => setStatus("loaded")}>
            Loaded
          </button>
          <button type="button" onClick={() => setStatus("loading")}>
            Loading
          </button>
          <button type="button" onClick={() => setStatus("error")}>
            Error
          </button>
        </div>
      </div>

      <FilterInput value={filterText} onChange={handleFilterChange} />

      {status === "loading" && (
        <p className="book-list__message">Loading books...</p>
      )}

      {status === "error" && (
        <p className="book-list__message book-list__message--error">
          Unable to load books. Try again later.
        </p>
      )}

      {status === "loaded" && filteredBooks.length === 0 && (
        <p className="book-list__message">No books match your filter.</p>
      )}

      {status === "loaded" && filteredBooks.length > 0 && (
        <ul className="book-list__items">
          {filteredBooks.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default BookList;
