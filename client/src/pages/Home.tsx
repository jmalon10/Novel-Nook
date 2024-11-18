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
        <>
     {loginCheck ? (
        <h1>Welcome to the home page!</h1>
      ) : (
        <div>
        <h1>You are not logged in!</h1>
        <p className="text-3xl font-bold underline">Please login to continue</p>
        </div>
      )}
    </>
    );
  };
  
  export default Home;