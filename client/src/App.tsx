import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container container-fluid mt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import SearchBooks from './pages/SearchBooks';

// const App = () => (
//   <Router>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<div>Home Page</div>} />  {/* Placeholder for Home component */}
//       <Route path="/search" element={<SearchBooks />} />   {/* Route for SearchBooks page */}
//     </Routes>
//   </Router>
// );

// export default App;