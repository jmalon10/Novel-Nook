// src/components/Logout.js
import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  const handleLogout = () => {
    // Simulate logout action (e.g., clearing session or authentication)
    alert("You've been logged out!");

    // Redirect to the home page or login screen
    history.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
