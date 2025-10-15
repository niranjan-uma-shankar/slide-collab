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
      errorElement: <ErrorPage />,
       children: [
        { index: true, element: <HomePage /> },
       ]
    },
    {
      path: "/",
      element: <Root viewMode="editor" />,
      errorElement: <ErrorPage />,
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

function ErrorPage() {
  return (
    <div id="error-page" className="flex flex-col items-center justify-center min-h-screen">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

export default App;
