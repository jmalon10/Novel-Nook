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
        background: 'linear-gradient(to bottom, #856F8C, #44345D)', // Gradient using hex codes
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
            <div className="text-center space-y-8">
              <h1 className="text-4xl font-bold">Welcome to the Best Sellers Portal!</h1>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
              <h2 className="text-2xl font-semibold">Check out the current best sellers!</h2>
              <div
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
>
  {[
    { title: "Young Adult", genre: "young-adult", image: "https://m.media-amazon.com/images/I/41RDgCHpGTL._SY445_SX342_.jpg" },
    { title: "Crime", genre: "crime-and-punishment", image: "https://m.media-amazon.com/images/I/41x6HtLdEhL._SY445_SX342_QL70_FMwebp_.jpg" },
    { title: "Relationships", genre: "relationships", image: "https://m.media-amazon.com/images/I/81xXA1fRHbL._SX522_.jpg" },
    { title: "Fantasy", genre: "fantasy", image: "https://m.media-amazon.com/images/I/81FQ9UXmRQL._SX522_.jpg" },
    { title: "Science Fiction", genre: "science-fiction", image: "https://m.media-amazon.com/images/I/41wWIbZxtzL._SY445_SX342_.jpg" },
    {
      title: "Series Books",
      genre: "series-books",
      image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg", // Harry Potter book cover
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
        <div className="text-center">
          <h1 className="text-4xl font-bold">Please log in to explore the Best Sellers Portal!</h1>
        </div>
      )}
    </div>
  );
};

export default Home;

