import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
      <main
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b"
        style={{
        
        }}
      >
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold color to-black text-center mb-6">Login</h2>
          <div>
            {data ? (
              <p className="text-center">
                Success! You may now head{' '}
                <Link to="/" className="text-blue-500 underline">
                  back to the homepage.
                </Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  className="w-full border rounded-lg p-2"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="w-full border rounded-lg p-2"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              <button
                className="w-full text-white p-2 rounded-lg"
                style={{
                  backgroundColor: '#44345D', // Background color in hex
                }}
              >
                Submit
              </button>
              </form>
            )}
  
            {error && (
              <div className="mt-4 p-3 bg-red-600 text-white text-center rounded-lg">
                User does not exist. Please try again or create a new user.
              </div>
            )}
           
          </div>
        </div>
        <div className="mt-6">
  <button className="bg-[#da6aa2] text-white px-4 py-2 rounded-lg hover:bg-[#c6518c] shadow-[0_0_15px_4px_rgba(255,255,255,1)] animate-pulse-glow transition duration-300">
    <Link to="/createUser">Create New User</Link>
  </button>
</div>
      </main>
    );
  };
  
  export default Login;