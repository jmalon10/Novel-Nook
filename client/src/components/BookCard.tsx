import React from 'react';

interface BookCardProps {
  coverId: number;
  title: string;
  author: string;
  coverUrl?: string;
  genres?: string[];
  onActionClick: () => void;
  actionLabel: string;
}

const BookCard: React.FC<BookCardProps> = ({
  coverId,
  title,
  author,
  coverUrl,
  genres = [],
  onActionClick,
  actionLabel,
}) => {
  return (
    <div
      key={coverId}
      className="bg-white text-black rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 text-center"
    >
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={`${title} cover`}
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
          <p className="text-gray-500">No Cover Available</p>
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{author}</p>
      <p className="text-sm text-gray-500 mb-4">
        Genres: {genres.join(', ') || 'Not Specified'}
      </p>
      <button
        onClick={onActionClick}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default BookCard;
