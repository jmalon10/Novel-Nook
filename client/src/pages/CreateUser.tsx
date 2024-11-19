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
        setCustomError( err.message);
      }
    }
  };

  return (
    <section className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Create User</h1>

      {isUserCreated ? (
        <div className="relative">
          <p className="text-lg font-semibold text-green-600">
            User created successfully!
          </p>
          <p className="text-gray-600 mt-2">Please login to continue.</p>
          {/* Sparkle animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-sparkle">
              ✨
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            {loading ? 'Submitting...' : 'Create User'}
          </button>
        </form>
      )}

      {customError && (
        <p className="text-red-600 font-medium mt-4">{customError}</p>
      )}
    </section>
  );
};

export default CreateUser;


