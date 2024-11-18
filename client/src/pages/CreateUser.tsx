import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; // Adjust the path as needed

const CreateUser = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isUserCreated, setIsUserCreated] = useState(false); // Track if the user was created successfully
  const [customError, setCustomError] = useState<string | null>(null); // Store custom error messages

  // Define the mutation hook
  const [addUser, { loading }] = useMutation(ADD_USER);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null); // Reset custom error
    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      if (data?.addUser?.token) {
        localStorage.setItem('token', data.addUser.token); // Optionally store the token
        setIsUserCreated(true); // Set success state
      }
    } catch (err: any) {
      console.error('Error creating user:', err);

      // Check for duplicate key error
      if (err.message.includes('duplicate key')) {
        setCustomError('Username/email already exists.');
      } else {
        setCustomError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <section>
      <h1>Create User</h1>
      {isUserCreated ? (
        <div>
          <p>User created successfully!</p>
          <p>Please login to continue.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Create User'}
          </button>
        </form>
      )}
      {customError && <p style={{ color: 'red' }}>{customError}</p>}
    </section>
  );
};

export default CreateUser;


