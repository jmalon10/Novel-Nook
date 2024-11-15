import React from 'react';

const Navbar = () => {
  return (
    <header className="display-flex justify-space-between align-center p-2 mint-green">
      <h1>Login</h1>
      <div className="button-group">
        {/* Login button */}
        <button className="login-btn" onClick={() => alert('Login clicked')}>
          Login
        </button>
        
        {/* Books button */}
        <button className="books-btn" onClick={() => alert('4 Books clicked')}>
          4 Books
        </button>
      </div>
    </header>
  );
};

export default Navbar;
