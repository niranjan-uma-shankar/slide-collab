import HomePage from './pages/HomePage.tsx';
import Root from './layouts/Root.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
       children: [
        { index: true, element: <HomePage /> },
       ]
    }
  ]);
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
