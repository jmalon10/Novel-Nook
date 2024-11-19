import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

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
    <header style={styles.header}>
      {/* Apply the styles directly to the <h1> element */}
      <h1 style={styles.title}>Welcome to Novel-Nook!</h1>
      <div className="button-group">
        {/* Login button */}
        {!loginCheck ? (
          <button className="btn bg-[#FFC0CB] hover:bg-[#FF69B4] text-white py-2 px-4 rounded-lg">
            <Link to="/login" className="no-underline text-shadow-lg">
              Login
            </Link>
          </button>
        ) : (
          <div>
            <button
              className="btn bg-mediumGray hover:bg-lightGray text-white py-2 px-4 rounded-lg"
              type="button"
              onClick={() => {
                Auth.logout();
              }}
            >
              <span className="text-shadow-lg">Logout</span>
            </button>
            <button className="books-btn">
              <Link to="/SearchBooks" className="no-underline text-shadow-lg">
                SearchBooks
              </Link>
            </button>

            <button className="library-btn">
              <Link to="/library" className="no-underline text-shadow-lg">
                MyLibrary
              </Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// Inline styles for title and header background
const styles = {
  header: {
    background: 'linear-gradient(to bottom, #856F8C, #44345D)', // Use 'background' instead of 'backgroundColor' for gradients
    color: '#fff', // White text for contrast
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '4rem', // Makes the title much bigger
    fontFamily: "'Cinzel', serif", // Fancy font style (make sure to import this font)
    textAlign: 'center', // Centers the title
    color: '#FF69B4', // A vibrant pink color for a "fancy" effect
    textShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)', // Adding a stronger text shadow for impact
    letterSpacing: '1.5px', // Adds space between the letters for a more elegant look
    margin: '0', // Remove default margin to keep everything tight
    padding: '10px', // Optional padding around the title
  },
};

export default Navbar;
