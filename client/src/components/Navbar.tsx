import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (Auth.loggedIn()) {
      setLoginCheck(true); // Set loginCheck to true if user is logged in
    }
  };

  useEffect(() => {
    checkLogin(); // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);

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
          <div>
          <button
            onClick={() => {
              Auth.logout();
              setIsLoggedIn(false); // Update login status after logout
            }}
            className="btn bg-mediumGray hover:bg-lightGray text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
            <button className="books-btn">
        <Link to="/SearchBooks" className="no-underline text-shadow-lg">
              Search
            </Link>
        </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;