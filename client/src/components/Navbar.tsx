// import React, { useState } from 'react';

// const Navbar = () => {
//   // State to control the visibility of the book list
//   const [showBooks, setShowBooks] = useState(false);
//   const [searchedBook, setsearchedBook] = useState<string>(''); // State to capture user's input

//   // Book titles (can be dynamic or fetched from an API)
//   const books = [
//     "Book 1: React for Beginners",
//     "Book 2: Advanced JavaScript",
//     "Book 3: TypeScript Essentials",
//     "Book 4: Fullstack Development with Node.js"
//   ];

//   // Toggle book visibility on button click
//   const toggleBooks = () => {
//     setShowBooks((prevState) => !prevState);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent page reload
//     console.log("Form submitted");

//     //  send favoriteArtist to an API or fetch artist info
//     if (searchedBook) {
//       try {
//         const response = await fetch(`/api/artists/tracksByArtist?artist=${encodeURIComponent(favoriteArtist)}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${Auth.getToken()}`
//           }
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setArtists(data.toptracks.track); // Add the new artist to the list
//           // setFavoriteArtist(''); // Clear input field after submission *** if this is uncommented the playlist will not show the input name
//         } else {
//           setError("Artist not found");
//         }
//       } catch (error) {
//         setError("Failed to fetch artist data");
//       }
//     }
//   };

//   return (
//     <header className="display-flex justify-space-between align-center p-2 mint-green">
//       <h1>Welcome Novel-Nook!</h1>
//       <div className="button-group">
//         {/* Login button */}
//         <button className="login-btn" onClick={() => alert('Login clicked')}>
//           Login
//         </button>
        
//         {/* Books button */}
//         <button className="books-btn" onClick={toggleBooks}>
//           Search
//         </button>
//       </div>

//       {/* Conditionally render the books list */}
//       {showBooks && (
//         <div className="book-list-box">
//           <h2>Books</h2>
//           <ul>
//             {books.map((book, index) => (
//               <li key={index}>{book}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </header>
//     <form onSubmit={handleSubmit} className="mt-8">
//     <label htmlFor="favoriteArtist" className="text-lg mr-4">
//       Enter your favorite artist:
//       </label>
//     <input
//       type="text"
//       className="text-black ml-2"
//       id="searchedBook"
//       value={searchedBook}
//       onChange={(e) => setsearchedBook(e.target.value)} // Update state when user types
//     />
//     <button 
// type="submit" 
// >
// Submit
// </button>
//   </form>

//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search Books</Link></li>
      </ul>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search books"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;