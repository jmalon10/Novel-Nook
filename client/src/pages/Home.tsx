import { useState, useEffect } from 'react';
import Auth from '../utils/auth'; 
const Home = () => {
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
      <div className="bg-gradient-to-b from-purple-500 to-purple-900 min-h-screen flex items-center justify-center text-white">
      {loginCheck ? (
        <h1 className="text-4xl font-bold">Welcome to the home page!</h1>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold">You are not logged in!</h1>
          <p className="text-3xl font-bold underline mt-4">Please login to continue</p>
        </div>
      )}
    </div>
    );
  };
  
  export default Home;