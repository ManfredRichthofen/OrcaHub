import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import LoadingSpinner from "../components/Spinner"; // Import the spinner component
import { IconFlame } from "@tabler/icons-react"; // Import modern fire icon

interface Comic {
  id: number;
  title: string;
  description: string;
  coverUrl: string | null;
}

const ExplorePage: React.FC = () => {
  const [topComics, setTopComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopComics = async () => {
      try {
        const response = await axios.get("http://localhost:3001/top-comics");
        setTopComics(response.data.comics);
      } catch (err) {
        console.error("Failed to fetch top comics:", err);
        setError("Failed to fetch top comics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopComics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex justify-center items-center mb-6">
        <IconFlame
          size={32}
          stroke={1.5}
          className="text-orange-500 dark:text-orange-400 mr-2"
        />
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          Explore Top Comics
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400 font-medium mb-4">
          {error}
        </p>
      )}

      {/* Comics Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topComics.map((comic) => (
            <Card
              key={comic.id}
              title={comic.title}
              imageUrl={comic.coverUrl}
              description={comic.description}
              actionLabel="View Details"
              onAction={() => console.log(`Viewing comic: ${comic.title}`)}
            />
          ))}
        </div>
      )}

      {/* No Results State */}
      {!loading && !error && !topComics.length && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No top comics found.
        </p>
      )}
    </div>
  );
};

export default ExplorePage;
