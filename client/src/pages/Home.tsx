import { useState, useEffect } from 'react';
import Auth from '../utils/auth'; 
const Home = () => {
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        setLoginCheck(Auth.loggedIn());
    }, [loginCheck]);
    return (
        <>
     { loginCheck ? (
        <h1>Welcome to the home page!</h1>
      ) : (
        <div>
        <h1>You are not logged in!</h1>
        <p>Please login to continue</p>
        </div>
      )}
    </>
    );
  };
  
  export default Home;