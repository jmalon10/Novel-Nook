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
import './index.css'
import App from './App.tsx';
import SearchBooks from './pages/SearchBooks.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import CreateUser from './pages/CreateUser.tsx';
import MyLibrary from './pages/MyLibrary.tsx';
import { setContext } from '@apollo/client/link/context';

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
// Auth link for including JWT in headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client setup
const client = new ApolloClient({
  link: ApolloLink.from([
    authLink, // Ensure JWT token is included
    errorLink, // Log errors
    new HttpLink({ uri: '/graphql' }), // GraphQL endpoint
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
        path: '/library',  // New MyLibrary route
        element: <MyLibrary />,
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
