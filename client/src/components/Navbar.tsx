import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query input
  const [showBooks, setShowBooks] = useState(false); // State to control the visibility of the book list
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status
  const navigate = useNavigate();

  // Function to check login status
  const checkLoginStatus = () => {
    setIsLoggedIn(Auth.loggedIn());
  };

  useEffect(() => {
    checkLoginStatus(); // Update login status on component mount
  }, []);

  // Function to handle search form submission
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // Book titles for demo purposes (can be dynamic or fetched from an API)
  const books = [
    "React for Beginners",
    "Advanced JavaScript",
    "TypeScript Essentials",
    "Fullstack Development with Node.js",
  ];

  return (
    <header className="navbar display-flex justify-space-between align-center p-2 mint-green">
      <h1>Welcome to Novel-Nook!</h1>
      
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search Books</Link></li>
        </ul>
      </nav>

      <div className="search-and-auth">
        {/* Search form */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Login/Logout button */}
        {!isLoggedIn ? (
          <Link to="/login" className="btn bg-activeGreen hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              Auth.logout();
              setIsLoggedIn(false); // Update login status after logout
            }}
            className="btn bg-mediumGray hover:bg-lightGray text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        )}

        {/* Toggle Books button */}
        <button className="btn books-btn" onClick={() => setShowBooks(!showBooks)}>
          {showBooks ? 'Hide Books' : 'Show Books'}
        </button>
      </div>

      {/* Conditionally render the books list */}
      {showBooks && (
        <div className="book-list-box">
          <h2>Suggested Books</h2>
          <ul>
            {books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;