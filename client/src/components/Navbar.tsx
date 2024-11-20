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
    <header className="flex flex-col items-center p-4 bg-gradient-to-b from-mint-green to-gray-200">
      <h1 className="text-5xl font-bold mb-4">Welcome to Novel-Nook!</h1>
      
      <div className="flex flex-wrap justify-center items-center gap-6">
        {/* Login button */}
        {!loginCheck ? (
          <button className="bg-[#da6aa2] hover:bg-[#c6518c] text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
            <Link to="/login" className="no-underline">
              Login
            </Link>
          </button>
        ) : (
          <>
            <button
              className="bg-[#da6aa2] hover:bg-[#c6518c] text-white py-3 px-4 rounded-lg shadow-md transition duration-300"
              type="button"
              onClick={() => {
                Auth.logout();
              }}
            >
              Logout
            </button>

            <button className="bg-[#da6aa2] hover:bg-[#c6518c] text-white py-3 px-4 rounded-lg shadow-md transition duration-300">
              <Link to="/SearchBooks" className="no-underline">
                Search Books
              </Link>
            </button>

            <button className="bg-[#da6aa2] hover:bg-[#c6518c] text-white py-3 px-4 rounded-lg shadow-md transition duration-300">
              <Link to="/library" className="no-underline">
                My Library
              </Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;




