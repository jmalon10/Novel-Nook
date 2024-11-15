// src/HomePage.tsx
import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import the CSS file

// HomePage component
const HomePage: React.FC = () => {
  // State to hold a list of items (type it as an array of strings)
  const [items, setItems] = useState<string[]>(['React', 'JavaScript', 'Hooks']);
  
  // State to manage loading state (boolean type)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate fetching data using useEffect
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 2000);
  }, []);

  // Function to add an item to the list
  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  return (
    <div className="home-page">
      <header>
        <h1>Welcome to the Home Page</h1>
      </header>

      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>List of Technologies:</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button onClick={addItem}>Add Item</button>
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2024 My Awesome React App</p>
      </footer>
    </div>
  );
};

export default HomePage;
