import React, { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/Spinner";
import { IconSearch, IconBook2 } from "@tabler/icons-react";

interface Comic {
  id: number;
  title: string;
  description: string;
  coverUrl: string | null;
}

const ComicsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [comics, setComics] = useState<Comic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const searchComics = async () => {
    setError(null);
    setComics([]);
    setLoading(true); // Start loading

    if (!searchTerm.trim()) {
      setError("Please enter a comic title.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/search-comics", {
        params: { title: searchTerm },
      });
      setComics(response.data.comics);
    } catch (err) {
      console.error("Failed to fetch comics. Please try again.", err);
      setError("Failed to fetch comics. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchComics();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex justify-center items-center mb-6">
        <IconBook2
          size={32}
          stroke={1.5}
          className="text-blue-500 dark:text-blue-400 mr-2"
        />
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          Comics Explorer
        </h2>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex w-full max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Enter comic title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress} // Trigger search on Enter key
            className="w-full p-3 text-gray-700 dark:text-gray-200 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={searchComics}
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

      {/* Comics Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {comics.map((comic) => (
            <Card
              key={comic.id}
              title={comic.title}
              imageUrl={comic.coverUrl}
              description={comic.description}
              actionLabel="Request Comic"
              onAction={() => console.log(`Requesting comic: ${comic.title}`)}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !comics.length && !error && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No comics found.
        </p>
      )}
    </div>
  );
};

export default ComicsPage;
