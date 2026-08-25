# React Fundamentals: Gate 6

This project implements **Track C: React Frontend - C1 Component fundamentals** as a typed, filterable, paginated book list.

## Run the project

```bash
npm install
npm run dev
```

The application can be opened at the local URL shown by Vite.

## Gate requirements

### Typed, composable components

The feature is split into focused components:

- `src/App.tsx` mounts the feature.
- `src/components/BookList.tsx` owns filter, status, and pagination state.
- `src/components/FilterInput.tsx` provides a controlled text input.
- `src/components/BookListItem.tsx` renders one book from typed props.
- `src/types.ts` defines the `Book` interface with `id`, `title`, `author`, and `isbn`.

`FilterInput` and `BookListItem` have explicit TypeScript prop contracts. Books are rendered with `key={book.id}` so React can track list items consistently.

### Correct state and interactions

`BookList` uses separate state values for each responsibility:

- `filterText` controls title filtering.
- `status` switches between loaded, loading, and error views.
- `currentPage` controls the visible page.

Filtering is case-insensitive and trims whitespace. Changing the filter resets pagination to page 1. Pagination displays two books per page and disables Previous or Next at the appropriate boundary.

The component renders the correct state through conditional rendering:

- Loaded and matching books: renders the paginated list.
- Loaded with no matches: shows `No books match your filter.`.
- Loading: shows `Loading books...` and hides the list.
- Error: shows an error message and hides the list.

The loading and error states are currently demonstrated with static status buttons. They model the UI states but are not connected to a real network request.

### React Testing Library coverage

`src/components/BookList.test.tsx` tests:

- Populated rendering and book counts
- User typing and title filtering
- Pagination from page 1 through page 3
- Empty results
- Loading state
- Error state

Tests use `user-event` for realistic typing and clicking, and accessible queries such as `getByRole`, `getByLabelText`, and `getByText`.

## Verification commands

```bash
npm test
npm run lint
npm run build
```

The test suite currently contains six passing tests. Linting and the TypeScript/Vite production build also pass.
