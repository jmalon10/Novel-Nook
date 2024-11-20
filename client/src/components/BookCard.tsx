import React from 'react';

interface BookCardProps {
  cover_id: number;
  title: string;
  author: string;
  cover_url?: string;
  genre?: string;
  onAction: () => void;
  actionLabel: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  cover_url,
  genre,
  onAction,
  actionLabel,
}) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 text-center">
      {cover_url ? (
        <img
          src={cover_url}
          alt={`${title} cover`}
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
          <p className="text-gray-500">No Cover Available</p>
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{author || 'Unknown Author'}</p>
      <p className="text-sm text-gray-500 mb-4">
        Genre: {genre || 'Not Specified'}
      </p>
      <button
        onClick={onAction}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default BookCard;
