import React, { useState, useRef } from "react";
import axios from "axios";

interface Book {
  title: string;
  author: string;
  olid: string | null;
  coverUrl: string | null;
}

const BookAdder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestedBooks, setRequestedBooks] = useState<string[]>([]);
  const searchTimeout = useRef<number | null>(null);

  const searchBooks = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.get("http://localhost:3001/search-books", {
        params: { title: searchTerm },
      });
      setBooks(response.data.books);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to fetch books.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const requestBook = async (book: Book) => {
    if (requestedBooks.includes(book.olid || "")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:3001/add-book", {
        title: book.title,
        author: book.author,
      });
      setRequestedBooks([...requestedBooks, book.olid || ""]);
      setSuccess(response.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to request book in Readarr.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = window.setTimeout(() => {
      searchBooks();
    }, 500);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter book title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        {loading && <span className="ml-2">Loading...</span>}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="grid grid-cols-2 gap-4">
        {books.map((book, idx) => (
          <div key={idx} className="p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="mt-2 w-32 h-48 object-cover"
              />
            ) : (
              <p className="text-gray-400 mt-2">No Cover Available</p>
            )}
            <button
              onClick={() => requestBook(book)}
              className={`mt-4 px-4 py-2 ${
                requestedBooks.includes(book.olid || "")
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500"
              } text-white rounded-md`}
              disabled={requestedBooks.includes(book.olid || "")}
            >
              {requestedBooks.includes(book.olid || "") ? "Requested" : "Request Book"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookAdder;
