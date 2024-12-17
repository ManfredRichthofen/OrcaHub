import React, { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/Spinner"; 
import { IconSearch, IconBook } from "@tabler/icons-react";

interface Book {
  title: string;
  author: string;
  coverUrl: string | null;
}

const BooksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const searchBooks = async () => {
    setError(null);
    setBooks([]);
    setLoading(true); // Start loading

    if (!searchTerm.trim()) {
      setError("Please enter a book title.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/search-books", {
        params: { title: searchTerm },
      });
      setBooks(response.data.books);
    } catch (err) {
      console.error("Failed to fetch books. Please try again.", err);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle key press (Enter key)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex justify-center items-center mb-6">
        <IconBook
          size={32}
          stroke={1.5}
          className="text-blue-500 dark:text-blue-400 mr-2"
        />
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          Books Explorer
        </h2>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex w-full max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Enter book title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-3 text-gray-700 dark:text-gray-200 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={searchBooks}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 font-medium transition duration-300 flex items-center"
          >
            <IconSearch size={20} stroke={1.5} className="mr-2" />
            Search
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400 font-medium mb-4">
          {error}
        </p>
      )}

      {/* Books Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, idx) => (
            <Card
              key={idx}
              title={book.title}
              imageUrl={book.coverUrl}
              description={`Author: ${book.author}`}
              actionLabel="Request Book"
              onAction={() => console.log(`Requesting book: ${book.title}`)}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !books.length && !error && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No books found.
        </p>
      )}
    </div>
  );
};

export default BooksPage;
