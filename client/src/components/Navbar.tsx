import React, { useState } from 'react';

const Navbar = () => {
  // State to control the visibility of the book list
  const [showBooks, setShowBooks] = useState(false);

  // Book titles (can be dynamic or fetched from an API)
  const books = [
    "Book 1: React for Beginners",
    "Book 2: Advanced JavaScript",
    "Book 3: TypeScript Essentials",
    "Book 4: Fullstack Development with Node.js"
  ];

  // Toggle book visibility on button click
  const toggleBooks = () => {
    setShowBooks((prevState) => !prevState);
  };

  return (
    <header className="navbar-container">
      <h1>Welcome to Novel-Nook!</h1>
      
      {/* Navigation Box with Explore, Home, Log In, and Profile buttons */}
      <div className="nav-box">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Explore</button>
        <button className="nav-btn" onClick={() => alert('Log In clicked')}>
          Log In
        </button>
        <button className="nav-btn">Profile</button>
      </div>

      {/* Search Bar directly placed in the navbar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for books..."
        />
      </div>

      {/* Books Button */}
      <div className="button-group">
        <button className="books-btn" onClick={toggleBooks}>
          Search Books
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




