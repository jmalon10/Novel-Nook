import { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

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
    <header className="flex justify-between items-center p-4 bg-[#2C3E50] text-white shadow-md">
      <h1 className="text-2xl font-bold">Welcome Novel-Nook!</h1>
      <div className="flex gap-4">
        {/* Login button */}
        {!loginCheck ? (
          <button className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded-lg shadow-md">
            <Link to="/login" className="no-underline">
              Login
            </Link>
          </button>
        ) : (
          <div className="flex gap-4">
            {/* Logout button */}
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md"
              type="button"
              onClick={() => {
                Auth.logout();
              }}
            >
              Logout
            </button>
            {/* Navigation buttons */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md">
              <Link to="/SearchBooks" className="no-underline">
                Search Books
              </Link>
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md">
              <Link to="/library" className="no-underline">
                My Library
              </Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;




