import HomePage from './pages/HomePage.tsx';
import AllSlidesPage from './pages/AllSlidesPage.tsx';
import Root from './layouts/Root.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleSlidePage from './pages/SingleSlide.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
       children: [
        { index: true, element: <HomePage /> },
       ]
    },
    {
      path: "/",
      element: <Root viewMode="editor" />,
       children: [
        {path: "slides/:slug", element: <AllSlidesPage /> },
        { path: 'slides/:slug/:slideId', element: <SingleSlidePage /> }
       ]
    }
  ]);
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
