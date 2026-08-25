import type { Book } from "../types";

interface BookListItemProps {
  book: Book;
}

function BookListItem({ book }: BookListItemProps) {
  return (
    <li className="book-list-item">
      <span>
        <strong>{book.title}</strong>
        <span> by {book.author}</span>
      </span>
      <span className="book-list-item__isbn">ISBN: {book.isbn}</span>
    </li>
  );
}

export default BookListItem;
