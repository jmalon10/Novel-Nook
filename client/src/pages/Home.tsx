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
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px' }}>
      {loginCheck ? (
        <>
          {!selectedGenre ? (
            <div>
              <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '10px' }}>
                  Welcome to the Best Sellers Portal!
                </h1>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </header>
              <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>
                Check out the current best sellers!
              </h2>
              <div
                className="card-container"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                  padding: '20px',
                }}
              >
                {[
                  { title: "Young Adult", genre: "young-adult", image: "url-to-childrens-books.jpg" },
                  { title: "Crime", genre: "crime-and-punishment", image: "url-to-fiction.jpg" },
                  { title: "Relationships", genre: "relationships", image: "url-to-nonfiction.jpg" },
                  { title: "Series Books", genre: "series-books", image: "url-to-series.jpg" },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="card"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '16px',
                      textAlign: 'center',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                    }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <h3 style={{ fontSize: '1.2rem', margin: '10px 0', color: '#333' }}>{card.title}</h3>
                    <button
                      onClick={() => handleExplore(card.genre)}
                      style={{
                        padding: '10px 15px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#333' }}>You are not logged in!</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>Please login to continue</p>
        </div>
      )}
    </div>
  );
};

export default Home;

