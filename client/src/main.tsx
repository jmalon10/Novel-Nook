// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// //import './index.css';

// import App from './App.tsx';
// import SearchBooks from './pages/SearchBooks.tsx';
// import ErrorPage from './pages/ErrorPage.tsx';
// import Login from './pages/Login.tsx';
// import Home from './pages/Home.tsx';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement:<ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       }, 
//       {
//         path: '/login',
//         element: <Login />
//       }, 
//       {
//         path: '/SearchBooks',
//         element: <SearchBooks />
//       }, 
//     ]
//   }
// ])

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
// }
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import App from './App.tsx';
import SearchBooks from './pages/SearchBooks.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import CreateUser from './pages/CreateUser.tsx';

// Error handling for Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Apollo Client setup
const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    new HttpLink({ uri: 'http://localhost:3000/graphql' }), // Update with your GraphQL server URL
  ]),
  cache: new InMemoryCache(),
});

// React Router setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/SearchBooks',
        element: <SearchBooks />,
      },
      {
        path: '/CreateUser',
        element: <CreateUser />,
      },
    ],
  },
]);

// Render the app with ApolloProvider and RouterProvider
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
