import React from "react";

interface CardProps {
  title: string;
  imageUrl: string | null;
  description?: string;
  author?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  description,
  author,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      {/* Cover Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 rounded-t-lg">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h3>

        {author && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Author: {author}
          </p>
        )}

        {description && (
          <p
            className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
