import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import './index.css';

import App from './App.tsx';
import SearchBooks from './src/pages/SearchBooks.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    Element: <SearchBooks />,
    children: [
    
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
