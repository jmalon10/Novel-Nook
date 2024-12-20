import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import BooksList from '../components/BestSellersList';

const Home = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    if (Auth.loggedIn()) setLoginCheck(true);
  }, []);

  const handleExplore = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleLogout = () => {
    Auth.logout();
    setLoginCheck(false);
    setSelectedGenre(null);
  };

  return (
    <div
      style={{
    
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      {loginCheck ? (
        <>
          {!selectedGenre ? (
                        <div className="space-y-8">
                        {/* Main Title */}
                        <div className="w-full flex justify-center items-start">
                          <h4 className="text-4xl font-bold mt-4">Welcome to the Best Sellers Portal!</h4>
                        </div>
          
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="px-6 py-3 bg-red-700 text-white rounded-lg shadow hover:bg-red-800 transition duration-300"
                        >
                          Logout
                        </button>
          
                        {/* Subtitle */}
                        <h4 className="text-2xl font-semibold">Check out the current best sellers!</h4>
          
                        {/* Genre Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                          {[
    { title: "Young Adult", genre: "Young-Adult", image: "https://m.media-amazon.com/images/I/41RDgCHpGTL._SY445_SX342_.jpg" },
    { title: "Crime", genre: "Crime-and-Punishment", image: "https://m.media-amazon.com/images/I/41x6HtLdEhL._SY445_SX342_QL70_FMwebp_.jpg" },
    { title: "Relationships", genre: "Relationships", image: "https://m.media-amazon.com/images/I/81xXA1fRHbL._SX522_.jpg" },
    { title: "Family", genre: "Family", image: "https://m.media-amazon.com/images/I/51JHL6vhssL._SX342_SY445_.jpg" },
    { title: "Travel", genre: "Travel", image: "https://m.media-amazon.com/images/I/51DZ9FcZqFS._SY445_SX342_.jpg" },
    {title: "Series Books", genre: "Series-Books",image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg", // Harry Potter book cover
    },
  ].map((card, index) => (
    <div
      key={index}
      className="bg-white text-black rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 text-center"
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-60 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-3">{card.title}</h3>
      <button
        onClick={() => handleExplore(card.genre)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Explore
      </button>
    </div>
  ))}
</div>

            </div>
          ) : (
            <BooksList genre={selectedGenre} goBack={() => setSelectedGenre(null)} />
          )}
        </>
      ) : (
        <div className="flex justify-center items-start min-h-screen">
        <h4 className="text-4xl font-bold mt-4">Please log in to explore the Best Sellers Portal!</h4>
      </div>
      )}
    </div>
  );
};

export default Home;

