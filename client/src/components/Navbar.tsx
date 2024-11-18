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



