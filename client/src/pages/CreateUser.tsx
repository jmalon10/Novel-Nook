import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 

const CreateUser = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isUserCreated, setIsUserCreated] = useState(false); // Track if the user was created successfully

  // Define the mutation hook
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      if (data?.addUser?.token) {
        localStorage.setItem('token', data.addUser.token); // Optionally store the token
        setIsUserCreated(true); // Set success state
      }
    } catch (err) {
      console.error('Error creating user:', err);
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
      {error && <p>Error: {error.message}</p>}
    </section>
  );
};

export default CreateUser;

