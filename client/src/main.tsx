import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App.tsx';
import SearchBooks from './pages/SearchBooks.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />, // Error handling component for unknown paths or errors
    children: [
      {
        index: true,
        element: <SearchBooks /> // This renders `SearchBooks` at the root path
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}