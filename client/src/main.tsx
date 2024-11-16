import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import './index.css';

import App from './App.tsx';
import SearchBooks from './pages/SearchBooks.tsx';
import ErrorPage from './pages/ErrorPage.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
       
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
