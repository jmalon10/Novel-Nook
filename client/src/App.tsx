// src/App.tsx
import React from 'react';
import './App.css';
import HomePage from './pages/Homepage';  // Fix the import to match the component name

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage />  {/* Use the HomePage component here */}
    </div>
  );
}

export default App;

