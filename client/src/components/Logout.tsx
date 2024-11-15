// src/components/Logout.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Simulate logout action (clear user session, etc.)
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

