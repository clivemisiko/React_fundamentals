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
  {
    id: 5,
    title: "Avatar: The Last Airbender - The Rise of Kyoshi",
    author: "Clive Misiko and F.C. Yee",
    isbn: "978-1732895902",
  }
];

type BookListStatus = "loaded" | "loading" | "error";
const BOOKS_PER_PAGE = 2;

function BookList() {
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<BookListStatus>("loaded");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = useCallback((value: string) => {
    setFilterText(value);
    setCurrentPage(1);
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / BOOKS_PER_PAGE),
  );
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE,
  );

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
        <>
          <ul className="book-list__items">
            {paginatedBooks.map((book) => (
              <BookListItem key={book.id} book={book} />
            ))}
          </ul>

          <nav className="book-list__pagination" aria-label="Book list pagination">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        </>
      )}
    </section>
  );
}

export default BookList;
