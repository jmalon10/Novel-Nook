// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// //import './index.css';

// import App from './App.tsx';
// import SearchBooks from './pages/SearchBooks.tsx';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <h1 className='display-2'>Wrong page!</h1>,
//     children: [
//       {
//         index: true,
//         element: <SearchBooks />
//       }, {
       
//       }
//     ]
//   }
// ])

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
// }

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import Home from './pages/Home.tsx';          // Import the Home component
import SearchBooks from './pages/SearchBooks.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,                       // This makes `Home` the default for `/`
        element: <Home />
      },
      {
        path: 'search',                    // Defines `/search` route
        element: <SearchBooks />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}