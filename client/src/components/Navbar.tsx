import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State to control the visibility of the book list
  const [showBooks, setShowBooks] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (Auth.loggedIn()) {
      setLoginCheck(true); // Set loginCheck to true if user is logged in
    }
  };

  useEffect(() => {
    checkLogin(); // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);

  // Book titles (can be dynamic or fetched from an API)
  const books = [
    "Book 1: React for Beginners",
    "Book 2: Advanced JavaScript",
    "Book 3: TypeScript Essentials",
    "Book 4: Fullstack Development with Node.js",
  ];

  // Toggle book visibility on button click
  const toggleBooks = () => {
    setShowBooks((prevState) => !prevState);
  };

  return (
    <header className="display-flex justify-space-between align-center p-2 mint-green">
      <h1>Welcome Novel-Nook!</h1>
      <div className="button-group">
        {/* Login button */}
        {!loginCheck ? (
          <button className="btn bg-activeGreen hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            <Link to="/login" className="no-underline text-shadow-lg">
              Login
            </Link>
          </button>
        ) : (
          <button
            className="btn bg-mediumGray hover:bg-lightGray text-white py-2 px-4 rounded-lg"
            type="button"
            onClick={() => {
              Auth.logout();
            }}
          >
            <span className="text-shadow-lg">Logout</span>
          </button>
        )}

        {/* Books button */}
        <button className="books-btn" onClick={toggleBooks}>
          Search
        </button>
      </div>

      {/* Conditionally render the books list */}
      {showBooks && (
        <div className="book-list-box">
          <h2>Books</h2>
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


